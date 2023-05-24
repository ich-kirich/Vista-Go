import { Dispatch } from "redux";
import { getSight } from "../../api/postService";
import { SIGHT } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchSight = (id: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHT.FETCH_SIGHT });
      const response = await getSight(id);
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

export default fetchSight;
