import { Dispatch } from "redux";
import { createTag } from "../../api/adminService";
import { ERROR, TAG } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchAddTag = (name: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: TAG.FETCH_TAG });
      const response = await createTag(name);
      dispatch({
        type: TAG.FETCH_TAG_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: TAG.FETCH_TAG_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchAddTag;
