import { INITIAL_SIGHT, SIGHT } from "../../libs/constants";
import { IAction, ISightState } from "../../types/types";

const initialState: ISightState = {
  sight: INITIAL_SIGHT,
  loading: false,
  error: null,
};

const sightsReducer = (
  state: ISightState = initialState,
  action: IAction,
): ISightState => {
  switch (action.type) {
    case SIGHT.FETCH_SIGHT:
      return { loading: true, error: null, sight: INITIAL_SIGHT };
    case SIGHT.FETCH_SIGHT_SUCCESS:
      return { loading: false, error: null, sight: action.payload };
    case SIGHT.FETCH_SIGHT_ERROR:
      return {
        loading: false,
        error: action.payload,
        sight: INITIAL_SIGHT,
      };
    default:
      return state;
  }
};

export default sightsReducer;
