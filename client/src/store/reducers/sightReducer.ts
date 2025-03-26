import { Sight } from "../../libs/enums";
import { IAction, ISights } from "../../types/types";

interface ISightState {
  sight: ISights | null;
  loading: boolean;
  error: null | string;
}

const initialState: ISightState = {
  sight: null,
  loading: false,
  error: null,
};

const sightsReducer = (
  state: ISightState = initialState,
  action: IAction,
): ISightState => {
  switch (action.type) {
    case Sight.FETCH_SIGHT:
      return { loading: true, error: null, sight: null };
    case Sight.FETCH_SIGHT_SUCCESS:
      return { loading: false, error: null, sight: action.payload };
    case Sight.FETCH_SIGHT_ERROR:
      return {
        loading: false,
        error: action.payload,
        sight: null,
      };
    default:
      return state;
  }
};

export default sightsReducer;
