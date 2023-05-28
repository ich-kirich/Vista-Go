import { Dispatch } from "redux";
import { deleteSight } from "../../api/adminService";
import { ERROR, SIGHT } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchDeleteSight = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHT.FETCH_SIGHT });
      const response = await deleteSight(id);
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

export default fetchDeleteSight;
