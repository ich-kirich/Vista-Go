import { Dispatch } from "redux";
import { getRecommends } from "../../api/postService";
import { ERROR, RECOMMENDS } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchRecommends = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: RECOMMENDS.FETCH_RECOMMENDS });
      const response = await getRecommends();
      dispatch({
        type: RECOMMENDS.FETCH_RECOMMENDS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: RECOMMENDS.FETCH_RECOMMENDS_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchRecommends;
