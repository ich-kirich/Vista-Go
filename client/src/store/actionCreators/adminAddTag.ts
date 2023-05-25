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
    } catch (e) {
      dispatch({
        type: TAG.FETCH_TAG_ERROR,
        payload: "Error adding tag",
      });
    }
  };
};

export default fetchAddTag;
