import { INITIAL_CITY, RECOMMENDS } from "../../libs/constants";
import { IAction, IRecommendState } from "../../types/types";

const initialState: IRecommendState = {
  recommend: INITIAL_CITY,
  loading: false,
  error: null,
};

const recommendReducer = (
  state: IRecommendState = initialState,
  action: IAction,
): IRecommendState => {
  switch (action.type) {
    case RECOMMENDS.FETCH_RECOMMENDS:
      return { loading: true, error: null, recommend: INITIAL_CITY };
    case RECOMMENDS.FETCH_RECOMMENDS_SUCCESS:
      return { loading: false, error: null, recommend: action.payload };
    case RECOMMENDS.FETCH_RECOMMENDS_ERROR:
      return { loading: false, error: action.payload, recommend: INITIAL_CITY };
    default:
      return state;
  }
};

export default recommendReducer;
