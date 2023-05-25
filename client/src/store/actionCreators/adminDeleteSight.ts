import { Dispatch } from "redux";
import { deleteSight } from "../../api/adminService";
import { SIGHT } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchDeleteSight = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHT.FETCH_SIGHT });
      const response = await deleteSight(id);
      dispatch({
        type: SIGHT.FETCH_SIGHT_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch({
        type: SIGHT.FETCH_SIGHT_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchDeleteSight;
