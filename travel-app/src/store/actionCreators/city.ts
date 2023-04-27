import { Dispatch } from "redux";
import { getCities } from "../../API/PostService";
import { COUNTRY } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchCity = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: COUNTRY.FETCH_COUNTRY });
      const response = await getCities();
      dispatch({
        type: COUNTRY.FETCH_COUNTRY_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: COUNTRY.FETCH_COUNTRY_ERROR,
        payload: "Error loading countries",
      });
    }
  };
};

export default fetchCity;
