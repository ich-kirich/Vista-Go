import { Dispatch } from "redux";
import { verificateUser } from "../../api/userService";
import { CODE, ERROR } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchCode = (
  name: string,
  email: string,
  password: string,
  code: string,
) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CODE.FETCH_CODE });
      const response = await verificateUser(name, email, password, code);
      dispatch({
        type: CODE.FETCH_CODE_SUCCESS,
        payload: response,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: CODE.FETCH_CODE_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchCode;
