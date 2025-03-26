import { City } from "../../libs/enums";
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
    case City.FETCH_CITY:
      return { loading: true, error: null, city: null };
    case City.FETCH_CITY_SUCCESS:
      return { loading: false, error: null, city: action.payload };
    case City.FETCH_CITY_ERROR:
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
