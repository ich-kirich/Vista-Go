import { Dispatch } from "react";
import { createSight, deleteSight, updateSight } from "../../api/adminService";
import { SIGHT, ERROR } from "../../libs/constants";
import {
  ICreateSight,
  IAction,
  CustomError,
  IUpdateSight,
} from "../../types/types";

export const fetchCreateSight = (params: ICreateSight) => {
  const { name, description, price, distance, tagIds, image } = params;
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHT.FETCH_SIGHT });
      const response = await createSight({
        name,
        description,
        price,
        distance,
        tagIds,
        image,
      });
      dispatch({
        type: SIGHT.FETCH_SIGHT_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      let errorMessage = ERROR.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          ERROR[error.response.data.message] || error.response?.data?.message;
      }

      dispatch({
        type: SIGHT.FETCH_SIGHT_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchDeleteSight = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHT.FETCH_SIGHT });
      const response = await deleteSight(id);
      dispatch({
        type: SIGHT.FETCH_SIGHT_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      let errorMessage = ERROR.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          ERROR[error.response.data.message] || error.response?.data?.message;
      }

      dispatch({
        type: SIGHT.FETCH_SIGHT_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUpdateSight = (params: IUpdateSight) => {
  const { id, name, description, price, distance, tagIds, image } = params;
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHT.FETCH_SIGHT });
      const response = await updateSight({
        id,
        name,
        description,
        price,
        distance,
        tagIds,
        image,
      });
      dispatch({
        type: SIGHT.FETCH_SIGHT_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      let errorMessage = ERROR.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          ERROR[error.response.data.message] || error.response?.data?.message;
      }

      dispatch({
        type: SIGHT.FETCH_SIGHT_ERROR,
        payload: errorMessage,
      });
    }
  };
};
