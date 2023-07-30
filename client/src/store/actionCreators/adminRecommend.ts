import { Dispatch } from "react";
import { createRecommend, deleteRecommend } from "../../api/adminService";
import { RECOMMEND, ERROR } from "../../libs/constants";
import { IAction, CustomError } from "../../types/types";

export const fetchAddRecommend = (cityId: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: RECOMMEND.FETCH_RECOMMEND });
      const response = await createRecommend(cityId);
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchDeleteRecommend = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: RECOMMEND.FETCH_RECOMMEND });
      const response = await deleteRecommend(id);
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_ERROR,
        payload: errorMessage,
      });
    }
  };
};
