import { Dispatch } from "react";
import { createGuide, deleteGuide, updateGuide } from "../../api/adminService";
import { GUIDE, ERROR } from "../../libs/constants";
import { IAction, CustomError } from "../../types/types";

export const fetchCreateGuide = (name: string, file: File) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: GUIDE.FETCH_GUIDE });
      const response = await createGuide(name, file);
      dispatch({
        type: GUIDE.FETCH_GUIDE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: GUIDE.FETCH_GUIDE_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchDeleteGuide = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: GUIDE.FETCH_GUIDE });
      const response = await deleteGuide(id);
      dispatch({
        type: GUIDE.FETCH_GUIDE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: GUIDE.FETCH_GUIDE_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUpdateGuide = (
  id: number,
  name: string,
  file: File | undefined,
) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: GUIDE.FETCH_GUIDE });
      const response = await updateGuide(id, name, file);
      dispatch({
        type: GUIDE.FETCH_GUIDE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: GUIDE.FETCH_GUIDE_ERROR,
        payload: errorMessage,
      });
    }
  };
};
