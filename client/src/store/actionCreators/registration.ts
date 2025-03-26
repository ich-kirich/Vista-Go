import { Dispatch } from "redux";
import { registrationUser } from "../../api/userService";
import { CustomError, IAction } from "../../types/types";
import { AppError, Registration } from "../../libs/enums";

const fetchRegistration = (name: string, email: string, password: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Registration.FETCH_REGISTRATION });
      const response = await registrationUser(name, email, password);
      dispatch({
        type: Registration.FETCH_REGISTRATION_SUCCESS,
        payload: response,
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
        type: Registration.FETCH_REGISTRATION_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchRegistration;
