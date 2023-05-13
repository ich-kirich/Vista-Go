import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import ApiError from "../error/apiError";
import User from "../../models/user";
import {
  DEFAULT_NAME_IMG,
  ERROR,
  LONG_NAME,
  MIN_LENGHT_NAME,
  MIN_LENGHT_PASSWORD,
  SHORT_PASSWORD,
} from "../libs/constants";

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

function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
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
    return new ApiError(StatusCodes.BAD_REQUEST, ERROR.USER_EXIST);
  }
  const checkEmail = validateEmail(email);
  if (!checkEmail) {
    return new ApiError(StatusCodes.BAD_REQUEST, ERROR.INCORRECT_EMAIL);
  }
  if (name.length > MIN_LENGHT_NAME) {
    return new ApiError(StatusCodes.BAD_REQUEST, LONG_NAME);
  }
  return validatePassword(password, name, email);
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const checkInput = await validationRegistration(email, password, name);
  if (checkInput instanceof ApiError) {
    return checkInput;
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const jwtToken = jwt.sign(
    { id: newUser.id, email, name },
    config.get("jwt.secretKey"),
    { expiresIn: "24h" },
  );
  return jwtToken;
}

export default createUser;
