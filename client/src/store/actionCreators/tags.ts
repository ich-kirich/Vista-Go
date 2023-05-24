import { Dispatch } from "redux";
import { getTags } from "../../api/postService";
import { TAGS } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchTags = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: TAGS.FETCH_TAGS });
      const response = await getTags();
      dispatch({
        type: TAGS.FETCH_TAGS_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch({
        type: TAGS.FETCH_TAGS_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchTags;
