import { Dispatch } from "redux";
import { getGuides } from "../../api/postService";
import { ERROR, GUIDES } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchGuides = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: GUIDES.FETCH_GUIDES });
      const response = await getGuides();
      dispatch({
        type: GUIDES.FETCH_GUIDES_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: GUIDES.FETCH_GUIDES_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchGuides;
