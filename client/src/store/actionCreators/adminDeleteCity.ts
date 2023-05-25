import { Dispatch } from "redux";
import { deleteCity } from "../../api/adminService";
import { CITY } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchDeleteCity = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CITY.FETCH_CITY });
      const response = await deleteCity(id);
      dispatch({
        type: CITY.FETCH_CITY_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch({
        type: CITY.FETCH_CITY_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchDeleteCity;
