import { Dispatch } from "redux";
import { getGuides } from "../../api/postService";
import { GUIDES } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchGuides = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: GUIDES.FETCH_GUIDES });
      const response = await getGuides();
      dispatch({
        type: GUIDES.FETCH_GUIDES_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch({
        type: GUIDES.FETCH_GUIDES_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchGuides;
