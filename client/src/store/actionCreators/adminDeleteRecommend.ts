import { Dispatch } from "redux";
import { deleteRecommend } from "../../api/adminService";
import { RECOMMEND } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchDeleteAdminRecommend = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: RECOMMEND.FETCH_RECOMMEND });
      const response = await deleteRecommend(id);
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchDeleteAdminRecommend;
