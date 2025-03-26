import { Dispatch } from "redux";
import { getCities, getCity } from "../../api/postService";
import { CustomError, IAction } from "../../types/types";
import { AppError, Cities, City } from "../../libs/enums";

export const fetchCities = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Cities.FETCH_CITIES });
      const response = await getCities();
      dispatch({
        type: Cities.FETCH_CITIES_SUCCESS,
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
        type: Cities.FETCH_CITIES_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchCity = (id: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: City.FETCH_CITY });
      const response = await getCity(id);
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
