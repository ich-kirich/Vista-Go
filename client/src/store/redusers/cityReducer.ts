import { INITIAL_COUNTRY, COUNTRY } from "../../libs/constants";
import { IAction, ICityState } from "../../types/types";

const initialState: ICityState = {
  countries: INITIAL_COUNTRY,
  loading: false,
  error: null,
};

const cityReducer = (
  state: ICityState = initialState,
  action: IAction,
): ICityState => {
  switch (action.type) {
    case COUNTRY.FETCH_COUNTRY:
      return { loading: true, error: null, countries: INITIAL_COUNTRY };
    case COUNTRY.FETCH_COUNTRY_SUCCESS:
      return { loading: false, error: null, countries: action.payload };
    case COUNTRY.FETCH_COUNTRY_ERROR:
      return {
        loading: false,
        error: action.payload,
        countries: INITIAL_COUNTRY,
      };
    default:
      return state;
  }
};

export default cityReducer;
