import { Dispatch } from "react";
import { createTag, deleteTag, updateTag } from "../../api/adminService";
import { IAction, CustomError } from "../../types/types";
import { AppError, Tag } from "../../libs/enums";

export const fetchAddTag = (name: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Tag.FETCH_TAG });
      const response = await createTag(name);
      dispatch({
        type: Tag.FETCH_TAG_SUCCESS,
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
        type: Tag.FETCH_TAG_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchDeleteTag = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Tag.FETCH_TAG });
      const response = await deleteTag(id);
      dispatch({
        type: Tag.FETCH_TAG_SUCCESS,
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
        type: Tag.FETCH_TAG_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUpdateTag = (id: number, name: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Tag.FETCH_TAG });
      const response = await updateTag(id, name);
      dispatch({
        type: Tag.FETCH_TAG_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        AppError[error.response.data.message] || error.response.data.message;
      dispatch({
        type: Tag.FETCH_TAG_ERROR,
        payload: errorMessage,
      });
    }
  };
};
