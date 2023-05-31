import { Dispatch } from "react";
import { createCity, deleteCity, updateCity } from "../../api/adminService";
import { CITY, ERROR } from "../../libs/constants";
import {
  ICreateCity,
  IAction,
  CustomError,
  IUpdateCity,
} from "../../types/types";

export const fetchCreateCity = (params: ICreateCity) => {
  const { country, name, lat, lon, sightIds, guideIds, image } = params;
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CITY.FETCH_CITY });
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
        type: CITY.FETCH_CITY_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: CITY.FETCH_CITY_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchDeleteCity = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CITY.FETCH_CITY });
      const response = await deleteCity(id);
      dispatch({
        type: CITY.FETCH_CITY_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: CITY.FETCH_CITY_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchUpdateCity = (params: IUpdateCity) => {
  const { id, country, name, lat, lon, sightIds, guideIds, image } = params;
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CITY.FETCH_CITY });
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
        type: CITY.FETCH_CITY_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: CITY.FETCH_CITY_ERROR,
        payload: errorMessage,
      });
    }
  };
};
