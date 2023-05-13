export const DEFAULT_NAME_IMG = "default.jpg";

export const MIN_LENGHT_PASSWORD = 8;

export const MIN_LENGHT_NAME = 10;

export const LONG_NAME = `The name must be no more than ${MIN_LENGHT_NAME} characters long.`;

export const SHORT_PASSWORD = `The password must be at least ${MIN_LENGHT_PASSWORD} characters.`;

export enum ERROR {
  INCORRECT_INPUT = "Incorrect email, password or name.",
  USER_EXIST = "User with this email exists.",
  PASSWORD_REQUIREMENTS = "The password must contain at least one number, one letter in upper and lower case, and one special character.",
  NO_PERSONAL_DATA = "The password must not contain the username, last name or email address.",
  SIMPLE_PASSWORD = "The password is too easy.",
  INCORRECT_EMAIL = "Incorrect email format.",
}
