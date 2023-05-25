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
    } catch (e) {
      dispatch({
        type: TAG.FETCH_TAG_ERROR,
        payload: "Error updating tag",
      });
    }
  };
};

export default fetchUpdateTag;
