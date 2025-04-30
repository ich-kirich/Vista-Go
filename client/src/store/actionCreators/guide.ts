import { Dispatch } from "redux";
import { getGuide } from "../../api/postService";
import { CustomError, IAction } from "../../types/types";
import { AppError, Guide } from "../../libs/enums";

const fetchGuide = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Guide.FETCH_GUIDE });
      const response = await getGuide(id);
      dispatch({
        type: Guide.FETCH_GUIDE_SUCCESS,
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
        type: Guide.FETCH_GUIDE_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchGuide;
