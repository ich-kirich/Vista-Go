import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
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

async function validateLogin(email: string, password: string) {
  const userExist = await User.findOne({ where: { email } });
  if (!userExist) {
    return new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ERROR.USER_NOT_FOUND,
    );
  }
  const comparePassword = bcrypt.compareSync(
    password,
    userExist.dataValues.password,
  );
  if (!comparePassword) {
    return new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
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
  const jwtToken = generateJwt(newUser.dataValues.id, email, name);
  return jwtToken;
}

export async function loginUser(email: string, password: string) {
  const checkLogin = await validateLogin(email, password);
  if (checkLogin instanceof ApiError) {
    return checkLogin;
  }
  const jwtToken = generateJwt(checkLogin.id, email, checkLogin.name);
  return jwtToken;
}

export default createUser;
