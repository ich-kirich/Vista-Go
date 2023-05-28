import { Dispatch } from "redux";
import { getAllSights } from "../../api/postService";
import { ERROR, SIGHTS } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchAllSights = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHTS.FETCH_SIGHTS });
      const response = await getAllSights();
      dispatch({
        type: SIGHTS.FETCH_SIGHTS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: SIGHTS.FETCH_SIGHTS_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchAllSights;
