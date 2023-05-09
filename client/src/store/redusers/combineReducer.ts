import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import cityReducer from "./cityReducer";
import recommendsReducer from "./recommendsReducer";
import sightReducer from "./sightReducer";
import sightsReducer from "./sightsReducer";

export const rootReducer = combineReducers({
  cities: citiesReducer,
  recommends: recommendsReducer,
  city: cityReducer,
  sights: sightsReducer,
  sight: sightReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
