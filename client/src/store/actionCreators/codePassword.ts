import { Dispatch } from "redux";
import { createCodePassword } from "../../api/userService";
import { CODEPASS, ERROR } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchCodePassword = (email: string, password: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CODEPASS.FETCH_CODEPASS });
      const response = await createCodePassword(email, password);
      dispatch({
        type: CODEPASS.FETCH_CODEPASS_SUCCESS,
        payload: response,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: CODEPASS.FETCH_CODEPASS_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchCodePassword;
