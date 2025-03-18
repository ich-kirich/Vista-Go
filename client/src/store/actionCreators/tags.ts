import { Dispatch } from "redux";
import { getTags } from "../../api/postService";
import { ERROR, TAGS } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchTags = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: TAGS.FETCH_TAGS });
      const response = await getTags();
      dispatch({
        type: TAGS.FETCH_TAGS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      let errorMessage = ERROR.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          ERROR[error.response.data.message] || error.response?.data?.message;
      }

      dispatch({
        type: TAGS.FETCH_TAGS_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchTags;
