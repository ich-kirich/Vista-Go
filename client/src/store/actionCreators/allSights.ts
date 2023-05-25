import { Dispatch } from "redux";
import { getAllSights } from "../../api/postService";
import { SIGHTS } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchAllSights = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHTS.FETCH_SIGHTS });
      const response = await getAllSights();
      dispatch({
        type: SIGHTS.FETCH_SIGHTS_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch({
        type: SIGHTS.FETCH_SIGHTS_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchAllSights;
