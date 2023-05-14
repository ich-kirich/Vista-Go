import { Dispatch } from "redux";
import { loginUser } from "../../api/userService";
import { USER } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: USER.FETCH_USER });
      const response = await loginUser(email, password);
      dispatch({
        type: USER.FETCH_USER_SUCCESS,
        payload: response,
      });
    } catch (e: any) {
      dispatch({
        type: USER.FETCH_USER_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchUser;
