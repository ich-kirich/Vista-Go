import { CITY } from "../../libs/constants";
import { IAction, ICities } from "../../types/types";

interface ICityState {
  city: ICities | null;
  loading: boolean;
  error: null | string;
}

const initialState: ICityState = {
  city: null,
  loading: false,
  error: null,
};

const cityReducer = (
  state: ICityState = initialState,
  action: IAction,
): ICityState => {
  switch (action.type) {
    case CITY.FETCH_CITY:
      return { loading: true, error: null, city: null };
    case CITY.FETCH_CITY_SUCCESS:
      return { loading: false, error: null, city: action.payload };
    case CITY.FETCH_CITY_ERROR:
      return {
        loading: false,
        error: action.payload,
        city: null,
      };
    default:
      return state;
  }
};

export default cityReducer;
