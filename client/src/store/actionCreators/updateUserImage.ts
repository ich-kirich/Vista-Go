import { Dispatch } from "redux";
import { changeImageUser } from "../../api/userService";
import { USER } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchUpdateUserImage = (id: number, file: File) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: USER.FETCH_USER });
      const response = await changeImageUser(id, file);
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

export default fetchUpdateUserImage;
