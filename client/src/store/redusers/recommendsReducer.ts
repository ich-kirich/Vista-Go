import { INITIAL_RECOMMENDS, RECOMMENDS } from "../../libs/constants";
import { IAction, IRecommendsState } from "../../types/types";

const initialState: IRecommendsState = {
  recommends: INITIAL_RECOMMENDS,
  loading: false,
  error: null,
};

const recommendsReducer = (
  state: IRecommendsState = initialState,
  action: IAction,
): IRecommendsState => {
  switch (action.type) {
    case RECOMMENDS.FETCH_RECOMMENDS:
      return { loading: true, error: null, recommends: INITIAL_RECOMMENDS };
    case RECOMMENDS.FETCH_RECOMMENDS_SUCCESS:
      return { loading: false, error: null, recommends: action.payload };
    case RECOMMENDS.FETCH_RECOMMENDS_ERROR:
      return {
        loading: false,
        error: action.payload,
        recommends: INITIAL_RECOMMENDS,
      };
    default:
      return state;
  }
};

export default recommendsReducer;
