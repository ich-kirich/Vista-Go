import { Dispatch } from "redux";
import { createCodePassword } from "../../api/userService";
import { CODEPASS } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchCodePassword = (name: string, email: string, password: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CODEPASS.FETCH_CODEPASS });
      const response = await createCodePassword(name, email, password);
      dispatch({
        type: CODEPASS.FETCH_CODEPASS_SUCCESS,
        payload: response,
      });
    } catch (e: any) {
      dispatch({
        type: CODEPASS.FETCH_CODEPASS_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchCodePassword;
