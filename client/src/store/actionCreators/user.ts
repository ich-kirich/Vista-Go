import { Dispatch } from "redux";
import { loginUser } from "../../api/userService";
import { ERROR, USER } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: USER.FETCH_USER });
      const response = await loginUser(email, password);
      dispatch({
        type: USER.FETCH_USER_SUCCESS,
        payload: response,
      });
    } catch (e: any) {
      const error = e as CustomError;
      let errorMessage = ERROR.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          ERROR[error.response.data.message] || error.response?.data?.message;
      }

      dispatch({
        type: USER.FETCH_USER_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchUser;
