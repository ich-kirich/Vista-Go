import { Dispatch } from "redux";
import { loginUser } from "../../api/userService";
import { CustomError, IAction } from "../../types/types";
import { AppError, User } from "../../libs/enums";

const fetchUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: User.FETCH_USER });
      const response = await loginUser(email, password);
      dispatch({
        type: User.FETCH_USER_SUCCESS,
        payload: response,
      });
    } catch (e: any) {
      const error = e as CustomError;
      let errorMessage = AppError.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          AppError[error.response.data.message] ||
          error.response?.data?.message;
      }

      dispatch({
        type: User.FETCH_USER_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchUser;
