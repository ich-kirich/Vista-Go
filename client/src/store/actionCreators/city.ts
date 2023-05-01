import { Dispatch } from "redux";
import { getCity } from "../../API/PostService";
import { CITY } from "../../libs/constants";
import { IAction } from "../../types/types";

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
      dispatch({
        type: CITY.FETCH_CITY_ERROR,
        payload: "Error loading city",
      });
    }
  };
};

export default fetchCity;
