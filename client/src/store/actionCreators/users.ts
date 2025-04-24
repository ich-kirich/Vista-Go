import { Dispatch } from "redux";
import { CustomError, IAction } from "../../types/types";
import { AppError, Sight, Sights, Users } from "../../libs/enums";
import { getUsers } from "../../api/adminService";

export const fetchUsers = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Users.FETCH_USERS });
      const response = await getUsers();
      dispatch({
        type: Users.FETCH_USERS_SUCCESS,
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
        type: Users.FETCH_USERS_ERROR,
        payload: errorMessage,
      });
    }
  };
};
