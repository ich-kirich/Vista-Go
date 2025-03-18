import { Dispatch } from "redux";
import { createCodePassword, verificateUser } from "../../api/userService";
import { CODE, CODEPASS, ERROR } from "../../libs/constants";
import { CustomError, IAction, IVerificateUser } from "../../types/types";

export const fetchCodeUser = (params: IVerificateUser) => {
  const { name, email, code } = params;
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CODE.FETCH_CODE });
      const response = await verificateUser({ name, email, code });
      dispatch({
        type: CODE.FETCH_CODE_SUCCESS,
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
        type: CODE.FETCH_CODE_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchCodePassword = (email: string, password: string) => {
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
      let errorMessage = ERROR.UNEXPECTED_ERROR;

      if (error.response?.data?.message) {
        errorMessage =
          ERROR[error.response.data.message] || error.response?.data?.message;
      }

      dispatch({
        type: CODEPASS.FETCH_CODEPASS_ERROR,
        payload: errorMessage,
      });
    }
  };
};
