import { Dispatch } from "redux";
import { getSight } from "../../api/postService";
import { ERROR, SIGHT } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchSight = (id: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHT.FETCH_SIGHT });
      const response = await getSight(id);
      dispatch({
        type: SIGHT.FETCH_SIGHT_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: SIGHT.FETCH_SIGHT_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchSight;
