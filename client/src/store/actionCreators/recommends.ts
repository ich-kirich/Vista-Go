import { Dispatch } from "redux";
import { getRecommends } from "../../api/postService";
import { CustomError, IAction } from "../../types/types";
import { AppError, Recommends } from "../../libs/enums";

const fetchRecommends = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Recommends.FETCH_RECOMMENDS });
      const response = await getRecommends();
      dispatch({
        type: Recommends.FETCH_RECOMMENDS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      let errorMessage = AppError.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          AppError[error.response.data.message] ||
          error.response?.data?.message;
      }

      dispatch({
        type: Recommends.FETCH_RECOMMENDS_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchRecommends;
