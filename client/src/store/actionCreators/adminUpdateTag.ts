import { Dispatch } from "redux";
import { updateTag } from "../../api/adminService";
import { TAG } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchUpdateTag = (id: number, name: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: TAG.FETCH_TAG });
      const response = await updateTag(id, name);
      dispatch({
        type: TAG.FETCH_TAG_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch({
        type: TAG.FETCH_TAG_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchUpdateTag;
