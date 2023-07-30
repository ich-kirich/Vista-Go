import { INITIAL_SIGHTS, SIGHTS } from "../../libs/constants";
import { IAction, ISightsState } from "../../types/types";

const initialState: ISightsState = {
  sights: INITIAL_SIGHTS,
  loading: false,
  error: null,
};

const sightsReducer = (
  state: ISightsState = initialState,
  action: IAction,
): ISightsState => {
  switch (action.type) {
    case SIGHTS.FETCH_SIGHTS:
      return { loading: true, error: null, sights: INITIAL_SIGHTS };
    case SIGHTS.FETCH_SIGHTS_SUCCESS:
      return { loading: false, error: null, sights: action.payload };
    case SIGHTS.FETCH_SIGHTS_ERROR:
      return {
        loading: false,
        error: action.payload,
        sights: INITIAL_SIGHTS,
      };
    default:
      return state;
  }
};

export default sightsReducer;
