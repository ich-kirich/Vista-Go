import { Dispatch } from "react";
import { createRecommend, deleteRecommend } from "../../api/adminService";
import { IAction, CustomError } from "../../types/types";
import { AppError, Recommend } from "../../libs/enums";

export const fetchAddRecommend = (cityId: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Recommend.FETCH_RECOMMEND });
      const response = await createRecommend(cityId);
      dispatch({
        type: Recommend.FETCH_RECOMMEND_SUCCESS,
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
        type: Recommend.FETCH_RECOMMEND_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchDeleteRecommend = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Recommend.FETCH_RECOMMEND });
      const response = await deleteRecommend(id);
      dispatch({
        type: Recommend.FETCH_RECOMMEND_SUCCESS,
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
        type: Recommend.FETCH_RECOMMEND_ERROR,
        payload: errorMessage,
      });
    }
  };
};
