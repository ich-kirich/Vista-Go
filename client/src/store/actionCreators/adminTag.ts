import { Dispatch } from "react";
import { createTag, deleteTag, updateTag } from "../../api/adminService";
import { TAG, ERROR } from "../../libs/constants";
import { IAction, CustomError } from "../../types/types";

export const fetchAddTag = (name: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: TAG.FETCH_TAG });
      const response = await createTag(name);
      dispatch({
        type: TAG.FETCH_TAG_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: TAG.FETCH_TAG_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchDeleteTag = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: TAG.FETCH_TAG });
      const response = await deleteTag(id);
      dispatch({
        type: TAG.FETCH_TAG_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: TAG.FETCH_TAG_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUpdateTag = (id: number, name: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: TAG.FETCH_TAG });
      const response = await updateTag(id, name);
      dispatch({
        type: TAG.FETCH_TAG_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: TAG.FETCH_TAG_ERROR,
        payload: errorMessage,
      });
    }
  };
};
