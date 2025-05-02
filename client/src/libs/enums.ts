export enum Routes {
  HOME = "/",
  CITY = "/city/:id",
  CABINET = "/cabinet",
  SIGHTS = "/city/:id/sights",
  SIGHT_DETAILS = "/city/:id/sights/:sightId",
  LOGIN = "/login",
  REGISTRATION = "/registration",
  ERROR = "/error",
  ADMIN = "/admin",
  GUIDE = "/guide/:id",
  MAP = "/map",
}

export enum AdminEntity {
  TAG = "tag",
  SIGHT = "sight",
  GUIDE = "guide",
  CITY = "city",
  RECOMMEND = "recommend",
  USERS = "users",
  GUIDE_REQUESTS = "guide_requests",
}

export enum AppError {
  INCORRECT_INPUT = "app_error.incorrect_input",
  USER_EXIST = "app_error.user_exists",
  PASSWORD_REQUIREMENTS = "app_error.password_requirements",
  NO_PERSONAL_DATA = "app_error.no_personal_data",
  SIMPLE_PASSWORD = "app_error.simple_password",
  INCORRECT_EMAIL = "app_error.incorrect_email",
  USER_NOT_FOUND = "app_error.user_not_found",
  INCORRECT_PASSWORD = "app_error.incorrect_password",
  USERNAME_NOT_FOUND = "app_error.username_not_found",
  FILE_NOT_IMAGE = "app_error.file_not_image",
  INCORRECT_NAME = "app_error.incorrect_name",
  INCORRECT_CODE = "app_error.incorrect_code",
  NOT_AUTHORIZED = "app_error.not_authorized",
  NO_ACCESS = "app_error.no_access",
  GUIDE_NOT_FOUND = "app_error.guide_not_found",
  TAG_NOT_FOUND = "app_error.tag_not_found",
  SIGHT_NOT_FOUND = "app_error.sight_not_found",
  CITY_NOT_FOUND = "app_error.city_not_found",
  RECOMMEND_NOT_FOUND = "app_error.recommend_not_found",
  INVALID_TYPE_TOKEN = "app_error.invalid_type_token",
  LONG_NAME = "app_error.long_name",
  SHORT_PASSWORD = "app_error.short_password",
  RECOMMEND_FOUND = "app_error.recommend_found",
  LOADING_USER = "app_error.loading_user",
  REENTERED_PASSWORD = "app_error.reentered_password",
  UNEXPECTED_ERROR = "app_error.unexpected_error",
  INVALID_NAME = "app_error.invalid_name",
  INVALID_LATITUDE = "app_error.invalid_latitude",
  INVALID_LONGITUDE = "app_error.invalid_longitude",
  USER_IS_BANNED = "app_error.user_is_banned",
  USER_IS_UNBANNED = "app_error.user_is_unbanned",
  USER_IS_ALREADY_GUIDE = "app_error.user_is_already_guide",
  GUIDE_REQUEST_ALREADY_EXISTS = "app_error.guide_request_already_exists",
  GUIDE_REQUEST_NOT_FOUND = "app_error.guide_request_not_found",
}

export enum CodePass {
  FETCH_CODEPASS = "FETCH_CODEPASS",
  FETCH_CODEPASS_SUCCESS = "FETCH_CODEPASS_SUCCESS",
  FETCH_CODEPASS_ERROR = "FETCH_CODEPASS_ERROR",
}

export enum Code {
  FETCH_CODE = "FETCH_CODE",
  FETCH_CODE_SUCCESS = "FETCH_CODE_SUCCESS",
  FETCH_CODE_ERROR = "FETCH_CODE_ERROR",
}

export enum Auth {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export enum User {
  FETCH_USER = "FETCH_USER",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_USER_ERROR = "FETCH_USER_ERROR",
  FETCH_USER_LOGOUT = "FETCH_USER_LOGOUT",
}

export enum Registration {
  FETCH_REGISTRATION = "FETCH_REGISTRATION",
  FETCH_REGISTRATION_SUCCESS = "FETCH_REGISTRATION_SUCCESS",
  FETCH_REGISTRATION_ERROR = "FETCH_REGISTRATION_ERROR",
}

export enum Tag {
  FETCH_TAG = "FETCH_TAG",
  FETCH_TAG_SUCCESS = "FETCH_TAG_SUCCESS",
  FETCH_TAG_ERROR = "FETCH_TAG_ERROR",
}

export enum Tags {
  FETCH_TAGS = "FETCH_TAGS",
  FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS",
  FETCH_TAGS_ERROR = "FETCH_TAGS_ERROR",
}

export enum Guide {
  FETCH_GUIDE = "FETCH_GUIDE",
  FETCH_GUIDE_SUCCESS = "FETCH_GUIDE_SUCCESS",
  FETCH_GUIDE_ERROR = "FETCH_GUIDE_ERROR",
}

export enum Guides {
  FETCH_GUIDES = "FETCH_GUIDES",
  FETCH_GUIDES_SUCCESS = "FETCH_GUIDES_SUCCESS",
  FETCH_GUIDES_ERROR = "FETCH_GUIDES_ERROR",
}

export enum Sight {
  FETCH_SIGHT = "FETCH_SIGHT",
  FETCH_SIGHT_SUCCESS = "FETCH_SIGHT_SUCCESS",
  FETCH_SIGHT_ERROR = "FETCH_SIGHT_ERROR",
}

export enum Sights {
  FETCH_SIGHTS = "FETCH_SIGHTS",
  FETCH_SIGHTS_SUCCESS = "FETCH_SIGHTS_SUCCESS",
  FETCH_SIGHTS_ERROR = "FETCH_SIGHTS_ERROR",
}

export enum Recommend {
  FETCH_RECOMMEND = "FETCH_RECOMMEND",
  FETCH_RECOMMEND_SUCCESS = "FETCH_RECOMMEND_SUCCESS",
  FETCH_RECOMMEND_ERROR = "FETCH_RECOMMEND_ERROR",
}

export enum Recommends {
  FETCH_RECOMMENDS = "FETCH_RECOMMENDS",
  FETCH_RECOMMENDS_SUCCESS = "FETCH_RECOMMENDS_SUCCESS",
  FETCH_RECOMMENDS_ERROR = "FETCH_RECOMMENDS_ERROR",
}

export enum City {
  FETCH_CITY = "FETCH_CITY",
  FETCH_CITY_SUCCESS = "FETCH_CITY_SUCCESS",
  FETCH_CITY_ERROR = "FETCH_CITY_ERROR",
}

export enum UserBan {
  FETCH_USER_BAN = "FETCH_USER_BAN",
  FETCH_USER_BAN_SUCCESS = "FETCH_USER_BAN_SUCCESS",
  FETCH_USER_BAN_ERROR = "FETCH_USER_BAN_ERROR",
}

export enum Users {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
}

export enum Cities {
  FETCH_CITIES = "FETCH_CITIES",
  FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS",
  FETCH_CITIES_ERROR = "FETCH_CITIES_ERROR",
}

export enum LocalStorageKeys {
  TOKEN = "vista_go_token",
}

export enum Locales {
  RU = "ru",
  EN = "en",
}

export enum ROLES {
  USER = "USER",
  ADMIN = "ADMIN",
  GUIDE = "GUIDE",
}
