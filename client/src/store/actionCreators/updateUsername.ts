import { Dispatch } from "redux";
import { changeNameUser } from "../../api/userService";
import { ERROR, USER } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchUpdateUsername = (id: number, name: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: USER.FETCH_USER });
      const response = await changeNameUser(id, name);
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

export default fetchUpdateUsername;
