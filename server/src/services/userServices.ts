import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../error/apiError";
import User from "../../models/user";
import {
  ERROR,
  GUIDES_REQUEST_STATUS,
  MIN_LENGTH_NAME,
  MIN_LENGTH_PASSWORD,
} from "../libs/constants";
import { generateJwt } from "../libs/jwtUtils";
import VerificationPassword from "../../models/verificationPassword";
import sendEmail from "../libs/sendEmails";
import { uploadImage } from "../libs/utils";
import logger from "../libs/logger";
import VerificationUser from "../../models/verificationUser";
import GuideRequest from "../../models/guideRequest";

function generateVerificationCode() {
  const code = uuidv4().replace(/-/g, "").slice(0, 5);
  return code;
}

async function checkVerificationPassword(email: string, code: string) {
  const verificationExist = await VerificationPassword.findOne({
    where: { email },
  });
  if (verificationExist) {
    if (verificationExist.dataValues.verificationCode === code) {
      const newPassword = verificationExist.dataValues.password;
      await VerificationPassword.destroy({ where: { email } });
      logger.info("Verification password code has been successfully verified");
      return newPassword;
    }
    logger.error("Incorrect confirmation code", code);
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_CODE);
  }
  logger.error("There is no user with this email", email);
  throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.USER_NOT_FOUND);
}

async function checkVerificationUser(email: string, code: string) {
  const verificationExist = await VerificationUser.findOne({
    where: { email },
  });
  if (verificationExist) {
    if (verificationExist.dataValues.verificationCode === code) {
      await VerificationPassword.destroy({ where: { email } });
      logger.info("Verification user code has been successfully verified");
      return verificationExist.dataValues;
    }
    logger.error("Incorrect confirmation code", code);
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_CODE);
  }
  logger.error("There is no user with this email", email);
  throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.USER_NOT_FOUND);
}

function validatePassword(password: string, email: string) {
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()\\[\]{};:'"<>,.?/\\|~`_+-=]/.test(
    password,
  );
  const containsEmail = new RegExp(email, "i").test(password);
  const isSimplePassword = /^(password|123456|qwerty|admin|letmein)$/i.test(
    password,
  );

  if (password.length < MIN_LENGTH_PASSWORD) {
    logger.error("Too short a password");
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.SHORT_PASSWORD);
  }
  if (!hasNumber || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
    logger.error("Password is uncomplicated");
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.PASSWORD_REQUIREMENTS);
  }
  if (containsEmail) {
    logger.error("The password must not contain personal data");
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.NO_PERSONAL_DATA);
  }
  if (isSimplePassword) {
    logger.error("Too easy a password");
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.SIMPLE_PASSWORD);
  }
  logger.info("Password validation was successful");
  return true;
}

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  const checkEmail = re.test(email);
  if (!checkEmail) {
    logger.error("The value entered as an email is not an email", checkEmail);
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.INCORRECT_EMAIL);
  }
  logger.info("Email validation was successful");
  return checkEmail;
}

function validateName(name: string) {
  if (name.length > MIN_LENGTH_NAME) {
    logger.error("Too long a name", name);
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.LONG_NAME);
  }
  if (!name) {
    logger.error("No value for the name", name);
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_NAME);
  }
  logger.info("Name validation was successful");
  return true;
}

async function validationRegistration(
  email: string,
  password: string,
  name: string,
) {
  if (!email || !password || !name) {
    logger.error("There is no value for the password or the email or the name");
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_INPUT);
  }
  const isUserExist = await User.findOne({ where: { email } });
  if (isUserExist) {
    logger.error(`User with this email: ${email} is already registered`);
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.USER_EXIST);
  }
  const checkEmail = validateEmail(email);
  const checkName = validateName(name);
  const checkPassword = validatePassword(password, email);
  logger.info("Validation of all entered data was successful");
  return true;
}

async function validateLogin(email: string, password: string) {
  const userExist = await User.findOne({ where: { email } });
  if (!userExist) {
    logger.error("There is no user with this email", email);
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.USER_NOT_FOUND);
  }
  if (userExist.dataValues.isBanned) {
    logger.error("Try to login banned user", userExist.dataValues.email);
    throw new ApiError(StatusCodes.FORBIDDEN, ERROR.USER_IS_BANNED);
  }
  const comparePassword = bcrypt.compareSync(
    password,
    userExist.dataValues.password,
  );
  if (!comparePassword) {
    logger.error("Incorrect password", password);
    throw new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      ERROR.INCORRECT_PASSWORD,
    );
  }

  return userExist.dataValues;
}

async function createVerification(
  email: string,
  name: string,
  password: string,
) {
  const verificationCode = generateVerificationCode();
  const verificationExist = await VerificationUser.findOne({
    where: { email },
  });
  const hashPassword = await bcrypt.hash(password, 5);
  if (verificationExist) {
    await VerificationUser.update(
      { verificationCode, password: hashPassword, name },
      { where: { email } },
    );
    logger.info("The verification code has been updated for this email", email);
    return verificationCode;
  }
  const newUser = await VerificationUser.create({
    email,
    name,
    password: hashPassword,
    verificationCode,
  });
  logger.info("The verification code has been created for this email", email);
  return verificationCode;
}

async function createVerificationPassword(email: string, password: string) {
  const verificationCode = generateVerificationCode();
  const verificationExist = await VerificationPassword.findOne({
    where: { email },
  });
  const hashPassword = await bcrypt.hash(password, 5);
  if (verificationExist) {
    await VerificationPassword.update(
      { verificationCode, password: hashPassword },
      { where: { email } },
    );
    logger.info(
      "The verification password code has been updated for this email",
      email,
    );
    return verificationCode;
  }
  const newUser = await VerificationPassword.create({
    email,
    password: hashPassword,
    verificationCode,
  });
  logger.info(
    "The verification password code has been created for this email",
    email,
  );
  return verificationCode;
}

export async function createUser(email: string, code: string) {
  const userInformation = await checkVerificationUser(email, code);
  const newUser = await User.create({
    name: userInformation.name,
    email,
    password: userInformation.password,
  });
  const jwtToken = generateJwt({
    id: newUser.dataValues.id,
    email,
    name: newUser.dataValues.name,
    image: newUser.dataValues.image,
    role: newUser.dataValues.role,
    isBanned: newUser.dataValues.isBanned,
  });
  return jwtToken;
}

export async function loginUser(email: string, password: string) {
  const checkLogin = await validateLogin(email, password);
  const jwtToken = generateJwt({
    id: checkLogin.id,
    email,
    name: checkLogin.name,
    image: checkLogin.image,
    role: checkLogin.role,
    isBanned: checkLogin.isBanned,
  });
  return jwtToken;
}

export async function updateNameUser(userId: number, username: string) {
  const checkName = validateName(username);
  await User.update({ name: username }, { where: { id: userId } });
  const user = await User.findByPk(userId);
  const jwtToken = generateJwt({
    id: userId,
    email: user.dataValues.email,
    name: username,
    image: user.dataValues.image,
    role: user.dataValues.role,
    isBanned: user.dataValues.isBanned,
  });
  return jwtToken;
}

export async function updateImageUser(userId: number, image: UploadedFile) {
  const loadImage = await uploadImage(image);
  await User.update({ image: loadImage }, { where: { id: userId } });
  const user = await User.findByPk(userId);
  const jwtToken = generateJwt({
    id: userId,
    email: user.dataValues.email,
    name: user.dataValues.name,
    image: user.dataValues.image,
    role: user.dataValues.role,
    isBanned: user.dataValues.isBanned,
  });
  return jwtToken;
}

export async function changeUserPassword(emailUser: string, code: string) {
  const newPassword = await checkVerificationPassword(emailUser, code);
  await User.update({ password: newPassword }, { where: { email: emailUser } });
  const user = await User.findOne({
    where: { email: emailUser },
  });
  const jwtToken = generateJwt({
    id: user.dataValues.id,
    email: emailUser,
    name: user.dataValues.name,
    image: user.dataValues.image,
    role: user.dataValues.role,
    isBanned: user.dataValues.isBanned,
  });
  return jwtToken;
}

export async function registrationUser(
  email: string,
  password: string,
  name: string,
) {
  const checkInput = await validationRegistration(email, password, name);
  const verificationCode = await createVerification(email, name, password);
  const trySend = await sendEmail(verificationCode, email);
  return true;
}

export async function verificationPassword(password: string, email: string) {
  const checkPassword = validatePassword(password, email);
  const verificationCode = await createVerificationPassword(email, password);
  const trySend = await sendEmail(verificationCode, email);
  return true;
}

export async function createGuideRequestService({
  userId,
  contacts,
  description,
  requestText,
}: {
  userId: number;
  contacts: string;
  description: string;
  requestText: string;
}) {
  const existing = await GuideRequest.findOne({
    where: { userId },
  });

  if (existing) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      ERROR.GUIDE_REQUEST_ALREADY_EXISTS,
    );
  }

  const newRequest = await GuideRequest.create({
    userId,
    contacts,
    description,
    requestText,
    status: GUIDES_REQUEST_STATUS.PENDING,
  });

  return newRequest;
}
