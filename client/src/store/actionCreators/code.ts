import { Dispatch } from "redux";
import { verificateUser } from "../../api/userService";
import { CODE } from "../../libs/constants";
import { IAction } from "../../types/types";

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
    } catch (e: any) {
      dispatch({
        type: CODE.FETCH_CODE_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchCode;
