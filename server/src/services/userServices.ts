import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import ApiError from "../error/apiError";
import User from "../../models/user";
import {
  ERROR,
  LONG_NAME,
  MIN_LENGHT_NAME,
  MIN_LENGHT_PASSWORD,
  SHORT_PASSWORD,
} from "../libs/constants";
import { generateJwt, uploadImageToApi } from "../libs/utils";
import Verification from "../../models/verification";
import sendEmail from "./sendEmails";

function generateVerificationCode() {
  const code = uuidv4().replace(/-/g, "").slice(0, 5);
  return code;
}

async function checkVerefication(emailUser: string, code: string) {
  const verificationExist = await Verification.findOne({
    where: { email: emailUser },
  });
  if (verificationExist) {
    if (verificationExist.dataValues.verificationCode === code) {
      await Verification.destroy({ where: { email: emailUser } });
      return true;
    }
    return new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_CODE);
  }
  return new ApiError(StatusCodes.BAD_REQUEST, ERROR.USER_NOT_FOUND);
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

  if (password.length < MIN_LENGHT_PASSWORD) {
    return new ApiError(StatusCodes.BAD_REQUEST, SHORT_PASSWORD);
  }
  if (!hasNumber || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
    return new ApiError(StatusCodes.BAD_REQUEST, ERROR.PASSWORD_REQUIREMENTS);
  }
  if (containsEmail) {
    return new ApiError(StatusCodes.BAD_REQUEST, ERROR.NO_PERSONAL_DATA);
  }
  if (isSimplePassword) {
    return new ApiError(StatusCodes.BAD_REQUEST, ERROR.SIMPLE_PASSWORD);
  }
  return true;
}

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  const checkEmail = re.test(email);
  if (!checkEmail) {
    return new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      ERROR.INCORRECT_EMAIL,
    );
  }
  return checkEmail;
}

function validateName(name: string) {
  if (name.length > MIN_LENGHT_NAME) {
    return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, LONG_NAME);
  }
  if (!name) {
    return new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_NAME);
  }
  return true;
}

async function validationRegistration(
  email: string,
  password: string,
  name: string,
) {
  if (!email || !password || !name) {
    return new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_INPUT);
  }
  const isUserExist = await User.findOne({ where: { email } });
  if (isUserExist) {
    return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.USER_EXIST);
  }
  const checkEmail = validateEmail(email);
  if (checkEmail instanceof ApiError) {
    return checkEmail;
  }
  const checkName = validateName(name);
  if (checkName instanceof ApiError) {
    return checkName;
  }
  return validatePassword(password, email);
}

async function validateLogin(email: string, password: string) {
  const userExist = await User.findOne({ where: { email } });
  if (!userExist) {
    return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.USER_NOT_FOUND);
  }
  const comparePassword = bcrypt.compareSync(
    password,
    userExist.dataValues.password,
  );
  if (!comparePassword) {
    return new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      ERROR.INCORRECT_PASSWORD,
    );
  }
  return userExist.dataValues;
}

async function createVerefication(emailUser: string) {
  const verificationCode = generateVerificationCode();
  const verificationExist = await Verification.findOne({
    where: { email: emailUser },
  });
  if (verificationExist) {
    await Verification.update(
      { verificationCode },
      { where: { email: emailUser } },
    );
    return verificationCode;
  }
  const newUser = await Verification.create({
    email: emailUser,
    verificationCode,
  });
  return verificationCode;
}

export async function validateFile(image: UploadedFile) {
  const fileExtension = mime.extension((image as UploadedFile).mimetype);
  if (
    !fileExtension ||
    !(image as UploadedFile).mimetype.startsWith("image/")
  ) {
    return new ApiError(StatusCodes.BAD_REQUEST, ERROR.FILE_NOT_IMAGE);
  }
  return fileExtension;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  code: string,
) {
  const checkVerification = await checkVerefication(email, code);
  if (checkVerification instanceof ApiError) {
    return checkVerification;
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const jwtToken = generateJwt(
    newUser.dataValues.id,
    email,
    name,
    newUser.dataValues.image,
    newUser.dataValues.role,
  );
  return jwtToken;
}

export async function loginUser(email: string, password: string) {
  const checkLogin = await validateLogin(email, password);
  if (checkLogin instanceof ApiError) {
    return checkLogin;
  }
  const jwtToken = generateJwt(
    checkLogin.id,
    email,
    checkLogin.name,
    checkLogin.image,
    checkLogin.role,
  );
  return jwtToken;
}

export async function updateNameUser(userId: number, username: string) {
  const checkName = validateName(username);
  if (checkName instanceof ApiError) {
    return checkName;
  }
  await User.update({ name: username }, { where: { id: userId } });
  const user = await User.findByPk(userId);
  const jwtToken = generateJwt(
    userId,
    user.dataValues.email,
    username,
    user.dataValues.image,
    user.dataValues.role,
  );
  return jwtToken;
}

export async function updateImageUser(userId: number, image: UploadedFile) {
  const checkFile = await validateFile(image);
  if (checkFile instanceof ApiError) {
    return checkFile;
  }
  const fileName = `${uuidv4()}.${checkFile as string}`;
  const loadImage = await uploadImageToApi(image, fileName);
  if (loadImage instanceof ApiError) {
    return loadImage;
  }
  await User.update({ image: loadImage }, { where: { id: userId } });
  const user = await User.findByPk(userId);
  const jwtToken = generateJwt(
    userId,
    user.dataValues.email,
    user.dataValues.name,
    user.dataValues.image,
    user.dataValues.role,
  );
  return jwtToken;
}

export async function сhangeUserPassword(
  emailUser: string,
  newPassword: string,
  code: string,
) {
  const checkVerification = await checkVerefication(emailUser, code);
  if (checkVerification instanceof ApiError) {
    return checkVerification;
  }
  const hashPassword = await bcrypt.hash(newPassword, 5);
  await User.update(
    { password: hashPassword },
    { where: { email: emailUser } },
  );
  const user = await User.findOne({
    where: { email: emailUser },
  });
  const jwtToken = generateJwt(
    user.dataValues.id,
    emailUser,
    user.dataValues.name,
    user.dataValues.image,
    user.dataValues.role,
  );
  return jwtToken;
}

export async function registrationUser(
  email: string,
  password: string,
  name: string,
) {
  const checkInput = await validationRegistration(email, password, name);
  if (checkInput instanceof ApiError) {
    return checkInput;
  }
  const verificationCode = await createVerefication(email);
  const trySend = await sendEmail(verificationCode, email);
  if (trySend instanceof ApiError) {
    return trySend;
  }
  return true;
}

export async function verificationPassword(password: string, email: string) {
  const checkPassword = validatePassword(password, email);
  if (checkPassword instanceof ApiError) {
    return checkPassword;
  }
  const verificationCode = await createVerefication(email);
  const trySend = await sendEmail(verificationCode, email);
  if (trySend instanceof ApiError) {
    return trySend;
  }
  return true;
}
