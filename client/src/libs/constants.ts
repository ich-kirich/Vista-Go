import React from "react";
import {
  ICities,
  ICode,
  IContext,
  IGuide,
  IRecommends,
  ISights,
  ITag,
} from "../types/types";

export const INITIAL_CITY: ICities = {
  id: 1,
  country: "Unknown",
  name: "Unknown",
  weather: "Unknown",
  image: "Unknown",
  sights: [],
  guides: [],
};

export const INITIAL_CITIES: ICities[] = [
  {
    id: 1,
    country: "Unknown",
    name: "Unknown",
    weather: "Unknown",
    image: "Unknown",
    guides: [],
    sights: [],
  },
];

export const INITIAL_RECOMMENDS: IRecommends[] = [
  {
    id: 1,
    country: "Unknown",
    name: "Unknown",
    weather: "Unknown",
    image: "Unknown",
    guides: [],
    sights: [],
    updatedAt: "Unknown",
    CityId: 1,
  },
];

export const INITIAL_RECOMMEND: IRecommends = {
  id: 1,
  country: "Unknown",
  name: "Unknown",
  weather: "Unknown",
  image: "Unknown",
  guides: [],
  sights: [],
  updatedAt: "Unknown",
  CityId: 1,
};

export const INITIAL_SIGHTS: ISights[] = [
  {
    id: 1,
    name: "Unknown",
    image: "Unknown",
    description: "Unknown",
    price: "Unknown",
    distance: "Unknown",
    tags: [],
  },
];

export const INITIAL_SIGHT: ISights = {
  id: 1,
  name: "Unknown",
  image: "Unknown",
  description: "Unknown",
  price: "Unknown",
  distance: "Unknown",
  tags: [],
};

export const INITIAL_GUIDES: IGuide[] = [
  {
    id: 1,
    name: "Unknown",
    image: "Unknown",
  },
];

export const INITIAL_GUIDE: IGuide = {
  id: 1,
  name: "Unknown",
  image: "Unknown",
};

export const INITIAL_CODE: ICode = {
  id: 1,
  email: "Unknown",
  verificationCode: "Unknown",
};

export const INITIAL_TAG: ITag = {
  id: 1,
  name: "Unknown",
};

export enum CITIES {
  FETCH_CITIES = "FETCH_CITIES",
  FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS",
  FETCH_CITIES_ERROR = "FETCH_CITIES_ERROR",
}

export enum CITY {
  FETCH_CITY = "FETCH_CITY",
  FETCH_CITY_SUCCESS = "FETCH_CITY_SUCCESS",
  FETCH_CITY_ERROR = "FETCH_CITY_ERROR",
}

export enum RECOMMENDS {
  FETCH_RECOMMENDS = "FETCH_RECOMMENDS",
  FETCH_RECOMMENDS_SUCCESS = "FETCH_RECOMMENDS_SUCCESS",
  FETCH_RECOMMENDS_ERROR = "FETCH_RECOMMENDS_ERROR",
}

export enum RECOMMEND {
  FETCH_RECOMMEND = "FETCH_RECOMMEND",
  FETCH_RECOMMEND_SUCCESS = "FETCH_RECOMMEND_SUCCESS",
  FETCH_RECOMMEND_ERROR = "FETCH_RECOMMEND_ERROR",
}

export enum SIGHTS {
  FETCH_SIGHTS = "FETCH_SIGHTS",
  FETCH_SIGHTS_SUCCESS = "FETCH_SIGHTS_SUCCESS",
  FETCH_SIGHTS_ERROR = "FETCH_SIGHTS_ERROR",
}

export enum SIGHT {
  FETCH_SIGHT = "FETCH_SIGHT",
  FETCH_SIGHT_SUCCESS = "FETCH_SIGHT_SUCCESS",
  FETCH_SIGHT_ERROR = "FETCH_SIGHT_ERROR",
}

export enum GUIDES {
  FETCH_GUIDES = "FETCH_GUIDES",
  FETCH_GUIDES_SUCCESS = "FETCH_GUIDES_SUCCESS",
  FETCH_GUIDES_ERROR = "FETCH_GUIDES_ERROR",
}

export enum GUIDE {
  FETCH_GUIDE = "FETCH_GUIDE",
  FETCH_GUIDE_SUCCESS = "FETCH_GUIDE_SUCCESS",
  FETCH_GUIDE_ERROR = "FETCH_GUIDE_ERROR",
}

export enum TAGS {
  FETCH_TAGS = "FETCH_TAGS",
  FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS",
  FETCH_TAGS_ERROR = "FETCH_TAGS_ERROR",
}

export enum TAG {
  FETCH_TAG = "FETCH_TAG",
  FETCH_TAG_SUCCESS = "FETCH_TAG_SUCCESS",
  FETCH_TAG_ERROR = "FETCH_TAG_ERROR",
}

export enum REGISTRATION {
  FETCH_REGISTRATION = "FETCH_REGISTRATION",
  FETCH_REGISTRATION_SUCCESS = "FETCH_REGISTRATION_SUCCESS",
  FETCH_REGISTRATION_ERROR = "FETCH_REGISTRATION_ERROR",
}

export enum USER {
  FETCH_USER = "FETCH_USER",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_USER_ERROR = "FETCH_USER_ERROR",
}

export enum AUTH {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export enum CODE {
  FETCH_CODE = "FETCH_CODE",
  FETCH_CODE_SUCCESS = "FETCH_CODE_SUCCESS",
  FETCH_CODE_ERROR = "FETCH_CODE_ERROR",
}

export enum CODEPASS {
  FETCH_CODEPASS = "FETCH_CODEPASS",
  FETCH_CODEPASS_SUCCESS = "FETCH_CODEPASS_SUCCESS",
  FETCH_CODEPASS_ERROR = "FETCH_CODEPASS_ERROR",
}

export const SETTINGS = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  centerMode: true,
  variableWidth: true,
};

export const INITIAL_AUTH = !!localStorage.getItem("token");

export const ERROR_LOADING_USER = "Error loading user information.";

export const ERROR_REPEAT = "Re-entered password did not match.";

export const ADMIN_ROLE = "ADMIN";

export const CONTEXT = React.createContext({} as IContext);

export enum ERROR {
  INCORRECT_INPUT = "Incorrect email, password or name.",
  USER_EXIST = "User with this email exists.",
  PASSWORD_REQUIREMENTS = "The password must contain at least one number, one letter in upper and lower case, and one special character.",
  NO_PERSONAL_DATA = "The password must not contain the username, last name or email address.",
  SIMPLE_PASSWORD = "The password is too easy.",
  INCORRECT_EMAIL = "Incorrect email format.",
  USER_NOT_FOUND = "User with this email was not found.",
  INCORRECT_PASSWORD = "Incorrect password.",
  USERNAME_NOT_FOUND = "User was not found.",
  FILE_NOT_IMAGE = "The file is not an image.",
  INCORRECT_NAME = "An invalid name was entered.",
  INCORRECT_CODE = "Incorrect code.",
  NOT_AUTHORIZED = "User is not logged in.",
  NO_ACCESS = "No access.",
  GUIDE_NOT_FOUND = "The guide was not found.",
  TAG_NOT_FOUND = "The tag was not found.",
  SIGHT_NOT_FOUND = "The sight was not found.",
  CITY_NOT_FOUND = "The city was not found.",
  RECOMMEND_NOT_FOUND = "The recommend was not found.",
  INVALID_TYPE_TOKEN = "Invalid token type. Bearer token expected.",
  LONG_NAME = "The name must be no more than 10 characters long.",
  SHORT_PASSWORD = "The password must be at least 8 characters.",
  RECOMMEND_FOUND = "Recommend with this city is exist.",
}
