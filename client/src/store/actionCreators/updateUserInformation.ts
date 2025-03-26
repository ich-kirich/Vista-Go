import { Dispatch } from "react";
import {
  changeImageUser,
  changeNameUser,
  checkCodePassword,
} from "../../api/userService";
import { IAction, CustomError } from "../../types/types";
import { AppError, User } from "../../libs/enums";

export const fetchUpdateUserImage = (file: File) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: User.FETCH_USER });
      const response = await changeImageUser(file);
      dispatch({
        type: User.FETCH_USER_SUCCESS,
        payload: response,
      });
    } catch (e: any) {
      const error = e as CustomError;
      let errorMessage = AppError.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          AppError[error.response.data.message] ||
          error.response?.data?.message;
      }

      dispatch({
        type: User.FETCH_USER_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUpdateUsername = (name: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: User.FETCH_USER });
      const response = await changeNameUser(name);
      dispatch({
        type: User.FETCH_USER_SUCCESS,
        payload: response,
      });
    } catch (e) {
      const error = e as CustomError;
      let errorMessage = AppError.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          AppError[error.response.data.message] ||
          error.response?.data?.message;
      }

      dispatch({
        type: User.FETCH_USER_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUpdateUserPassword = (code: string, email: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: User.FETCH_USER });
      const response = await checkCodePassword(email, code);
      dispatch({
        type: User.FETCH_USER_SUCCESS,
        payload: response,
      });
    } catch (e) {
      const error = e as CustomError;
      let errorMessage = AppError.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          AppError[error.response.data.message] ||
          error.response?.data?.message;
      }

      dispatch({
        type: User.FETCH_USER_ERROR,
        payload: errorMessage,
      });
    }
  };
};
