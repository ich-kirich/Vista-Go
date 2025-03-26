import { Dispatch } from "redux";
import { createCodePassword, verifyUser } from "../../api/userService";
import { CustomError, IAction, IVerifyUser } from "../../types/types";
import { AppError, Code, CodePass } from "../../libs/enums";

export const fetchCodeUser = (params: IVerifyUser) => {
  const { name, email, code } = params;
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: Code.FETCH_CODE });
      const response = await verifyUser({ name, email, code });
      dispatch({
        type: Code.FETCH_CODE_SUCCESS,
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
        type: Code.FETCH_CODE_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export const fetchCodePassword = (email: string, password: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CodePass.FETCH_CODEPASS });
      const response = await createCodePassword(email, password);
      dispatch({
        type: CodePass.FETCH_CODEPASS_SUCCESS,
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
        type: CodePass.FETCH_CODEPASS_ERROR,
        payload: errorMessage,
      });
    }
  };
};
