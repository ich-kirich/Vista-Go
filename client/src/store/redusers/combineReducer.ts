import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import cityReducer from "./cityReducer";
import recommendsReducer from "./recommendsReducer";

export const rootReducer = combineReducers({
  cities: citiesReducer,
  recommends: recommendsReducer,
  city: cityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
