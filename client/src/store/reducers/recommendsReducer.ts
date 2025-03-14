import { RECOMMENDS } from "../../libs/constants";
import { IAction, IRecommends } from "../../types/types";

interface IRecommendsState {
  recommends: IRecommends[] | null;
  loading: boolean;
  error: null | string;
}

const initialState: IRecommendsState = {
  recommends: null,
  loading: false,
  error: null,
};

const recommendsReducer = (
  state: IRecommendsState = initialState,
  action: IAction,
): IRecommendsState => {
  switch (action.type) {
    case RECOMMENDS.FETCH_RECOMMENDS:
      return { loading: true, error: null, recommends: null };
    case RECOMMENDS.FETCH_RECOMMENDS_SUCCESS:
      return { loading: false, error: null, recommends: action.payload };
    case RECOMMENDS.FETCH_RECOMMENDS_ERROR:
      return {
        loading: false,
        error: action.payload,
        recommends: null,
      };
    default:
      return state;
  }
};

export default recommendsReducer;
