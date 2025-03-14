import { RECOMMEND } from "../../libs/constants";
import { IAction, IRecommends } from "../../types/types";

interface IRecommendState {
  recommend: IRecommends | null;
  loading: boolean;
  error: null | string;
}

const initialState: IRecommendState = {
  recommend: null,
  loading: false,
  error: null,
};

const recommendReducer = (
  state: IRecommendState = initialState,
  action: IAction,
): IRecommendState => {
  switch (action.type) {
    case RECOMMEND.FETCH_RECOMMEND:
      return { loading: true, error: null, recommend: null };
    case RECOMMEND.FETCH_RECOMMEND_SUCCESS:
      return { loading: false, error: null, recommend: action.payload };
    case RECOMMEND.FETCH_RECOMMEND_ERROR:
      return {
        loading: false,
        error: action.payload,
        recommend: null,
      };
    default:
      return state;
  }
};

export default recommendReducer;
