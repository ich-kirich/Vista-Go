import { Dispatch } from "redux";
import { createTag } from "../../api/adminService";
import { TAG } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchAddTag = (name: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: TAG.FETCH_TAG });
      const response = await createTag(name);
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

export default fetchAddTag;
