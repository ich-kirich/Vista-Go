import { Dispatch } from "redux";
import { getAllSights, getSight, getCitySights } from "../../api/postService";
import { CustomError, IAction } from "../../types/types";
import { AppError, Sight, Sights } from "../../libs/enums";

export const fetchSights = (id: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Sights.FETCH_SIGHTS });
      const response = await getCitySights(id);
      dispatch({
        type: Sights.FETCH_SIGHTS_SUCCESS,
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
        type: Sights.FETCH_SIGHTS_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchAllSights = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Sights.FETCH_SIGHTS });
      const response = await getAllSights();
      dispatch({
        type: Sights.FETCH_SIGHTS_SUCCESS,
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
        type: Sights.FETCH_SIGHTS_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchSight = (id: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Sight.FETCH_SIGHT });
      const response = await getSight(id);
      dispatch({
        type: Sight.FETCH_SIGHT_SUCCESS,
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
        type: Sight.FETCH_SIGHT_ERROR,
        payload: errorMessage,
      });
    }
  };
};
