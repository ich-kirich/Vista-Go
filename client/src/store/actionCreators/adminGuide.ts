import { Dispatch } from "react";
import { createGuide, deleteGuide, updateGuide } from "../../api/adminService";
import { IAction, CustomError } from "../../types/types";
import { AppError, Guide } from "../../libs/enums";

export const fetchCreateGuide = (
  name: { en: string; ru: string },
  description: { en: string; ru: string },
  contacts: string,
  cityIds: number[],
  sightIds: number[],
  file: File,
  userId: number,
) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Guide.FETCH_GUIDE });
      const response = await createGuide(
        name,
        description,
        contacts,
        cityIds,
        sightIds,
        file,
        userId,
      );
      dispatch({
        type: Guide.FETCH_GUIDE_SUCCESS,
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
        type: Guide.FETCH_GUIDE_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchDeleteGuide = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Guide.FETCH_GUIDE });
      const response = await deleteGuide(id);
      dispatch({
        type: Guide.FETCH_GUIDE_SUCCESS,
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
        type: Guide.FETCH_GUIDE_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUpdateGuide = (
  id: number,
  name: {
    en: string;
    ru: string;
  },
  description: {
    en: string;
    ru: string;
  },
  contacts: string,
  file: File | undefined,
  cityIds: number[],
  sightIds: number[],
) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Guide.FETCH_GUIDE });
      const response = await updateGuide(
        id,
        name,
        file,
        description,
        contacts,
        cityIds,
        sightIds,
      );
      dispatch({
        type: Guide.FETCH_GUIDE_SUCCESS,
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
        type: Guide.FETCH_GUIDE_ERROR,
        payload: errorMessage,
      });
    }
  };
};
