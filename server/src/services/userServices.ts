import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import path from "path";
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
import { generateJwt } from "../libs/utils";

function validatePassword(password: string, username: string, email: string) {
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()\\[\]{};:'"<>,.?/\\|~`_+-=]/.test(
    password,
  );
  const containsUsername = new RegExp(username, "i").test(password);
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
  if (containsUsername || containsEmail) {
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

export function validateName(name: string) {
  if (name.length > MIN_LENGHT_NAME) {
    return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, LONG_NAME);
  }
  if (!name) {
    return new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_NAME);
  }
  return true;
}

export async function validationRegistration(
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
  return validatePassword(password, name, email);
}

export async function validateLogin(email: string, password: string) {
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

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const hashPassword = await bcrypt.hash(password, 5);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const jwtToken = generateJwt(newUser.dataValues.id, email, name);
  return jwtToken;
}

export async function loginUser(
  id: number,
  email: string,
  name: string,
  image: string,
) {
  const jwtToken = generateJwt(id, email, name, image);
  return jwtToken;
}

export async function updateNameUser(userId: number, username: string) {
  await User.update({ name: username }, { where: { id: userId } });
  const user = await User.findByPk(userId);
  const jwtToken = generateJwt(
    userId,
    user.dataValues.email,
    username,
    user.dataValues.image,
  );
  return jwtToken;
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

export async function updateImageUser(
  userId: number,
  image: UploadedFile,
  fileExtension: string,
) {
  const fileName = `${uuidv4()}.${fileExtension}`;
  (image as UploadedFile).mv(
    path.resolve(__dirname, "..", "..", "static", fileName),
  );
  await User.update({ image: fileName }, { where: { id: userId } });
  const user = await User.findByPk(userId);
  const jwtToken = generateJwt(
    userId,
    user.dataValues.email,
    user.dataValues.name,
    user.dataValues.image,
  );
  return jwtToken;
}
