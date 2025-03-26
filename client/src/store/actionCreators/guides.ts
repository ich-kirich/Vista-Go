import { Dispatch } from "redux";
import { getGuides } from "../../api/postService";
import { CustomError, IAction } from "../../types/types";
import { AppError, Guides } from "../../libs/enums";

const fetchGuides = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Guides.FETCH_GUIDES });
      const response = await getGuides();
      dispatch({
        type: Guides.FETCH_GUIDES_SUCCESS,
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
        type: Guides.FETCH_GUIDES_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchGuides;
