import { INITIAL_RECOMMEND, RECOMMEND } from "../../libs/constants";
import { IAction, IRecommendState } from "../../types/types";

const initialState: IRecommendState = {
  recommend: INITIAL_RECOMMEND,
  loading: false,
  error: null,
};

const adminRecommendReducer = (
  state: IRecommendState = initialState,
  action: IAction,
): IRecommendState => {
  switch (action.type) {
    case RECOMMEND.FETCH_RECOMMEND:
      return { loading: true, error: null, recommend: INITIAL_RECOMMEND };
    case RECOMMEND.FETCH_RECOMMEND_SUCCESS:
      return { loading: false, error: null, recommend: action.payload };
    case RECOMMEND.FETCH_RECOMMEND_ERROR:
      return {
        loading: false,
        error: action.payload,
        recommend: INITIAL_RECOMMEND,
      };
    default:
      return state;
  }
};

export default adminRecommendReducer;
