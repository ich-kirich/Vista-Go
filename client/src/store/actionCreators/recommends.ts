import { Dispatch } from "redux";
import { getRecommends } from "../../API/PostService";
import { RECOMMENDS } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchRecommends = () => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: RECOMMENDS.FETCH_RECOMMENDS });
      const response = await getRecommends();
      dispatch({
        type: RECOMMENDS.FETCH_RECOMMENDS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: RECOMMENDS.FETCH_RECOMMENDS_ERROR,
        payload: "Error loading recommends",
      });
    }
  };
};

export default fetchRecommends;
