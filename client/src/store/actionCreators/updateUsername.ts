import { Dispatch } from "redux";
import { changeNameUser } from "../../api/userService";
import { USER } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchUpdateUsername = (id: number, name: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: USER.FETCH_USER });
      const response = await changeNameUser(id, name);
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

export default fetchUpdateUsername;
