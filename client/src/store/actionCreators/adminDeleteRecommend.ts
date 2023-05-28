import { Dispatch } from "redux";
import { deleteRecommend } from "../../api/adminService";
import { ERROR, RECOMMEND } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchDeleteRecommend = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: RECOMMEND.FETCH_RECOMMEND });
      const response = await deleteRecommend(id);
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchDeleteRecommend;
