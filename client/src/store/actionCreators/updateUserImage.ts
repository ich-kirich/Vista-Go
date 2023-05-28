import { Dispatch } from "redux";
import { changeImageUser } from "../../api/userService";
import { ERROR, USER } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchUpdateUserImage = (id: number, file: File) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: USER.FETCH_USER });
      const response = await changeImageUser(id, file);
      dispatch({
        type: USER.FETCH_USER_SUCCESS,
        payload: response,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: USER.FETCH_USER_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchUpdateUserImage;
