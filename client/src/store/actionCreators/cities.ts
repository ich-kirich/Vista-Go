import { Dispatch } from "redux";
import { getCities, getCity } from "../../api/postService";
import { CITIES, CITY, ERROR } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

export const fetchCities = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CITIES.FETCH_CITIES });
      const response = await getCities();
      dispatch({
        type: CITIES.FETCH_CITIES_SUCCESS,
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
        type: CITIES.FETCH_CITIES_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchCity = (id: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CITY.FETCH_CITY });
      const response = await getCity(id);
      dispatch({
        type: CITY.FETCH_CITY_SUCCESS,
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
        type: CITY.FETCH_CITY_ERROR,
        payload: errorMessage,
      });
    }
  };
};
