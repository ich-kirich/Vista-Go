import { combineReducers } from "redux";
import authReducer from "./authReducer";
import citiesReducer from "./citiesReducer";
import cityReducer from "./cityReducer";
import codeReducer from "./codeReducer";
import guidesReducer from "./guidesReducer";
import recommendsReducer from "./recommendsReducer";
import registrationReducer from "./registrationReducer";
import sightReducer from "./sightReducer";
import sightsReducer from "./sightsReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
  cities: citiesReducer,
  recommends: recommendsReducer,
  city: cityReducer,
  sights: sightsReducer,
  sight: sightReducer,
  guides: guidesReducer,
  auth: authReducer,
  registration: registrationReducer,
  user: userReducer,
  code: codeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
