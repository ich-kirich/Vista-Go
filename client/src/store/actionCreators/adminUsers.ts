import { Dispatch } from "react";
import { IAction, CustomError } from "../../types/types";
import { AppError, UserBan, UserRole } from "../../libs/enums";
import {
  banUser,
  downgradeToUser,
  unBanUser,
  upgradeToAdmin,
} from "../../api/adminService";

export const fetchBanUser = (email: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: UserBan.FETCH_USER_BAN });
      const response = await banUser(email);
      dispatch({
        type: UserBan.FETCH_USER_BAN_SUCCESS,
        payload: response.data,
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
        type: UserBan.FETCH_USER_BAN_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUnBanUser = (email: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: UserBan.FETCH_USER_BAN });
      const response = await unBanUser(email);
      dispatch({
        type: UserBan.FETCH_USER_BAN_SUCCESS,
        payload: response.data,
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
        type: UserBan.FETCH_USER_BAN_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUpgradeRoleUser = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: UserRole.FETCH_USER_ROLE });
      const response = await upgradeToAdmin(id);
      dispatch({
        type: UserRole.FETCH_USER_ROLE_SUCCESS,
        payload: response.data,
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
        type: UserRole.FETCH_USER_ROLE_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchDowngradeRoleUser = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: UserRole.FETCH_USER_ROLE });
      const response = await downgradeToUser(id);
      dispatch({
        type: UserRole.FETCH_USER_ROLE_SUCCESS,
        payload: response.data,
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
        type: UserRole.FETCH_USER_ROLE_ERROR,
        payload: errorMessage,
      });
    }
  };
};
