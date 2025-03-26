import { Cities } from "../../libs/enums";
import { IAction, ICities } from "../../types/types";

interface ICitiesState {
  cities: ICities[] | null;
  loading: boolean;
  error: null | string;
}

const initialState: ICitiesState = {
  cities: null,
  loading: false,
  error: null,
};

const citiesReducer = (
  state: ICitiesState = initialState,
  action: IAction,
): ICitiesState => {
  switch (action.type) {
    case Cities.FETCH_CITIES:
      return { loading: true, error: null, cities: null };
    case Cities.FETCH_CITIES_SUCCESS:
      return { loading: false, error: null, cities: action.payload };
    case Cities.FETCH_CITIES_ERROR:
      return {
        loading: false,
        error: action.payload,
        cities: null,
      };
    default:
      return state;
  }
};

export default citiesReducer;
