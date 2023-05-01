import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import cityReducer from "./cityReducer";
import recommendReducer from "./recommendReducer";
import recommendsReducer from "./recommendsReducer";

export const rootReducer = combineReducers({
  cities: citiesReducer,
  recommends: recommendsReducer,
  city: cityReducer,
  recommend: recommendReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
