import { Sights } from "../../libs/enums";
import { IAction, ISights } from "../../types/types";

interface ISightsState {
  sights: ISights[] | null;
  loading: boolean;
  error: null | string;
}

const initialState: ISightsState = {
  sights: null,
  loading: false,
  error: null,
};

const sightsReducer = (
  state: ISightsState = initialState,
  action: IAction,
): ISightsState => {
  switch (action.type) {
    case Sights.FETCH_SIGHTS:
      return { loading: true, error: null, sights: null };
    case Sights.FETCH_SIGHTS_SUCCESS:
      return { loading: false, error: null, sights: action.payload };
    case Sights.FETCH_SIGHTS_ERROR:
      return {
        loading: false,
        error: action.payload,
        sights: null,
      };
    default:
      return state;
  }
};

export default sightsReducer;
