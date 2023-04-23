import { INITIAL_CITY, CITY } from "../../libs/constants";
import { IAction, ICityState } from "../../types/types";

const initialState: ICityState = {
  countries: INITIAL_CITY,
  loading: false,
  error: null,
};

const cityReducer = (
  state: ICityState = initialState,
  action: IAction,
): ICityState => {
  switch (action.type) {
    case CITY.FETCH_CITY:
      return { loading: true, error: null, countries: INITIAL_CITY };
    case CITY.FETCH_CITY_SUCCESS:
      return { loading: false, error: null, countries: action.payload };
    case CITY.FETCH_CITY_ERROR:
      return { loading: false, error: action.payload, countries: INITIAL_CITY };
    default:
      return state;
  }
};

export default cityReducer;
