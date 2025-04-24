import { combineReducers } from "redux";
import recommendReducer from "./recommendReducer";
import authReducer from "./authReducer";
import citiesReducer from "./citiesReducer";
import cityReducer from "./cityReducer";
import codepassReducer from "./codepassReducer";
import codeReducer from "./codeReducer";
import guideReducer from "./guideReducer";
import guidesReducer from "./guidesReducer";
import recommendsReducer from "./recommendsReducer";
import registrationReducer from "./registrationReducer";
import sightReducer from "./sightReducer";
import sightsReducer from "./sightsReducer";
import tagReducer from "./tagReducer";
import tagsReducer from "./tagsReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";

export const rootReducer = combineReducers({
  cities: citiesReducer,
  recommends: recommendsReducer,
  city: cityReducer,
  sights: sightsReducer,
  sight: sightReducer,
  guide: guideReducer,
  guides: guidesReducer,
  auth: authReducer,
  registration: registrationReducer,
  user: userReducer,
  code: codeReducer,
  codepass: codepassReducer,
  recommend: recommendReducer,
  tags: tagsReducer,
  tag: tagReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
