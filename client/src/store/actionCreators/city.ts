import { Dispatch } from "redux";
import getCities from "../../API/PostService";
import { CITY } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchLink = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CITY.FETCH_CITY });
      const response = await getCities();
      dispatch({
        type: CITY.FETCH_CITY_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CITY.FETCH_CITY_ERROR,
        payload: "Error loading cities",
      });
    }
  };
};

export default fetchLink;
