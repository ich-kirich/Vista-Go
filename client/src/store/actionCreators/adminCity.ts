import { Dispatch } from "react";
import { createCity, deleteCity, updateCity } from "../../api/adminService";
import {
  ICreateCity,
  IAction,
  CustomError,
  IUpdateCity,
} from "../../types/types";
import { AppError, City } from "../../libs/enums";

export const fetchCreateCity = (params: ICreateCity) => {
  const { country, name, lat, lon, sightIds, guideIds, image } = params;
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: City.FETCH_CITY });
      const response = await createCity({
        country,
        name,
        lat,
        lon,
        sightIds,
        guideIds,
        image,
      });
      dispatch({
        type: City.FETCH_CITY_SUCCESS,
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
        type: City.FETCH_CITY_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchDeleteCity = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: City.FETCH_CITY });
      const response = await deleteCity(id);
      dispatch({
        type: City.FETCH_CITY_SUCCESS,
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
        type: City.FETCH_CITY_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUpdateCity = (params: IUpdateCity) => {
  const { id, country, name, lat, lon, sightIds, guideIds, image } = params;
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: City.FETCH_CITY });
      const response = await updateCity({
        id,
        country,
        name,
        lat,
        lon,
        sightIds,
        guideIds,
        image,
      });
      dispatch({
        type: City.FETCH_CITY_SUCCESS,
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
        type: City.FETCH_CITY_ERROR,
        payload: errorMessage,
      });
    }
  };
};
