import { Dispatch } from "redux";
import { registrationUser } from "../../api/userService";
import { ERROR, REGISTRATION } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchRegistration = (name: string, email: string, password: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: REGISTRATION.FETCH_REGISTRATION });
      const response = await registrationUser(name, email, password);
      dispatch({
        type: REGISTRATION.FETCH_REGISTRATION_SUCCESS,
        payload: response,
      });
    } catch (e) {
      const error = e as CustomError;
      let errorMessage = ERROR.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          ERROR[error.response.data.message] || error.response?.data?.message;
      }

      dispatch({
        type: REGISTRATION.FETCH_REGISTRATION_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchRegistration;
