import { Dispatch } from "redux";
import { getCity } from "../../api/postService";
import { CITY, ERROR } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchCity = (id: string) => {
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
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: CITY.FETCH_CITY_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchCity;
