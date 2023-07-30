import { Dispatch } from "redux";
import { getAllSights, getSight, getSights } from "../../api/postService";
import { ERROR, SIGHT, SIGHTS } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

export const fetchSights = (id: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHTS.FETCH_SIGHTS });
      const response = await getSights(id);
      dispatch({
        type: SIGHTS.FETCH_SIGHTS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: SIGHTS.FETCH_SIGHTS_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchAllSights = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHTS.FETCH_SIGHTS });
      const response = await getAllSights();
      dispatch({
        type: SIGHTS.FETCH_SIGHTS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: SIGHTS.FETCH_SIGHTS_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchSight = (id: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHT.FETCH_SIGHT });
      const response = await getSight(id);
      dispatch({
        type: SIGHT.FETCH_SIGHT_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: SIGHT.FETCH_SIGHT_ERROR,
        payload: errorMessage,
      });
    }
  };
};
