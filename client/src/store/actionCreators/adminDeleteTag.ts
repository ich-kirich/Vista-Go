import { Dispatch } from "redux";
import { deleteTag } from "../../api/adminService";
import { TAG } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchDeleteTag = (id: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: TAG.FETCH_TAG });
      const response = await deleteTag(id);
      dispatch({
        type: TAG.FETCH_TAG_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: TAG.FETCH_TAG_ERROR,
        payload: "Error deleting tag",
      });
    }
  };
};

export default fetchDeleteTag;
