import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../error/apiError";
import User from "../../models/user";
import {
  ERROR,
  LONG_NAME,
  MIN_LENGHT_NAME,
  MIN_LENGHT_PASSWORD,
  SHORT_PASSWORD,
} from "../libs/constants";
import { generateJwt } from "../libs/jwtUtils";
import Verification from "../../models/verification";
import sendEmail from "../libs/sendEmails";
import { uploadImage } from "../libs/utils";
import { ICreateUser } from "../types/types";

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
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_CODE);
  }
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

  if (password.length < MIN_LENGHT_PASSWORD) {
    throw new ApiError(StatusCodes.BAD_REQUEST, SHORT_PASSWORD);
  }
  if (!hasNumber || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.PASSWORD_REQUIREMENTS);
  }
  if (containsEmail) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.NO_PERSONAL_DATA);
  }
  if (isSimplePassword) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.SIMPLE_PASSWORD);
  }
  return true;
}

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  const checkEmail = re.test(email);
  if (!checkEmail) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.INCORRECT_EMAIL);
  }
  return checkEmail;
}

function validateName(name: string) {
  if (name.length > MIN_LENGHT_NAME) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, LONG_NAME);
  }
  if (!name) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_NAME);
  }
  return true;
}

async function validationRegistration(
  email: string,
  password: string,
  name: string,
) {
  if (!email || !password || !name) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_INPUT);
  }
  const isUserExist = await User.findOne({ where: { email } });
  if (isUserExist) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.USER_EXIST);
  }
  const checkEmail = validateEmail(email);
  const checkName = validateName(name);
  return validatePassword(password, email);
}

async function validateLogin(email: string, password: string) {
  const userExist = await User.findOne({ where: { email } });
  if (!userExist) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.USER_NOT_FOUND);
  }
  const comparePassword = bcrypt.compareSync(
    password,
    userExist.dataValues.password,
  );
  if (!comparePassword) {
    throw new ApiError(
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

export async function createUser(params: ICreateUser) {
  const { name, email, password, code } = params;
  const checkVerification = await checkVerefication(email, code);
  const hashPassword = await bcrypt.hash(password, 5);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const jwtToken = generateJwt({
    id: newUser.dataValues.id,
    email,
    name,
    image: newUser.dataValues.image,
    role: newUser.dataValues.role,
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
  });
  return jwtToken;
}

export async function сhangeUserPassword(
  emailUser: string,
  newPassword: string,
  code: string,
) {
  const checkVerification = await checkVerefication(emailUser, code);
  const hashPassword = await bcrypt.hash(newPassword, 5);
  await User.update(
    { password: hashPassword },
    { where: { email: emailUser } },
  );
  const user = await User.findOne({
    where: { email: emailUser },
  });
  const jwtToken = generateJwt({
    id: user.dataValues.id,
    email: emailUser,
    name: user.dataValues.name,
    image: user.dataValues.image,
    role: user.dataValues.role,
  });
  return jwtToken;
}

export async function registrationUser(
  email: string,
  password: string,
  name: string,
) {
  const checkInput = await validationRegistration(email, password, name);
  const verificationCode = await createVerefication(email);
  const trySend = await sendEmail(verificationCode, email);
  return true;
}

export async function verificationPassword(password: string, email: string) {
  const checkPassword = validatePassword(password, email);
  const verificationCode = await createVerefication(email);
  const trySend = await sendEmail(verificationCode, email);
  return true;
}
