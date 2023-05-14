import { Dispatch } from "redux";
import { registrationUser } from "../../api/userService";
import { REGISTRATION } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchRegistration = (name: string, email: string, password: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: REGISTRATION.FETCH_REGISTRATION });
      const response = await registrationUser(name, email, password);
      dispatch({
        type: REGISTRATION.FETCH_REGISTRATION_SUCCESS,
        payload: response,
      });
    } catch (e: any) {
      dispatch({
        type: REGISTRATION.FETCH_REGISTRATION_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchRegistration;
