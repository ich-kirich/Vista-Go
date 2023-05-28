import { Dispatch } from "redux";
import { getCities } from "../../api/postService";
import { CITIES, ERROR } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchCities = () => {
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
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: CITIES.FETCH_CITIES_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchCities;
