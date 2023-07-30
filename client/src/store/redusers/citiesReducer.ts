import { INITIAL_CITIES, CITIES } from "../../libs/constants";
import { IAction, ICitiesState } from "../../types/types";

const initialState: ICitiesState = {
  cities: INITIAL_CITIES,
  loading: false,
  error: null,
};

const citiesReducer = (
  state: ICitiesState = initialState,
  action: IAction,
): ICitiesState => {
  switch (action.type) {
    case CITIES.FETCH_CITIES:
      return { loading: true, error: null, cities: INITIAL_CITIES };
    case CITIES.FETCH_CITIES_SUCCESS:
      return { loading: false, error: null, cities: action.payload };
    case CITIES.FETCH_CITIES_ERROR:
      return {
        loading: false,
        error: action.payload,
        cities: INITIAL_CITIES,
      };
    default:
      return state;
  }
};

export default citiesReducer;
