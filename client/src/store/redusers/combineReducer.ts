import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import cityReducer from "./cityReducer";
import recommendsReducer from "./recommendsReducer";
import sightsReducer from "./sightsReducer";

export const rootReducer = combineReducers({
  cities: citiesReducer,
  recommends: recommendsReducer,
  city: cityReducer,
  sights: sightsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
