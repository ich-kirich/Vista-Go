import { Dispatch } from "redux";
import { getTags } from "../../api/postService";
import { CustomError, IAction } from "../../types/types";
import { AppError, Tags } from "../../libs/enums";

const fetchTags = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Tags.FETCH_TAGS });
      const response = await getTags();
      dispatch({
        type: Tags.FETCH_TAGS_SUCCESS,
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
        type: Tags.FETCH_TAGS_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchTags;
