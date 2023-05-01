import { Dispatch } from "redux";
import { getRecommend } from "../../API/PostService";
import { RECOMMEND } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchRecommend = (id: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: RECOMMEND.FETCH_RECOMMEND });
      const response = await getRecommend(id);
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_ERROR,
        payload: "Error loading recommend",
      });
    }
  };
};

export default fetchRecommend;
