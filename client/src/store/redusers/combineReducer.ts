import { combineReducers } from "redux";
import adminRecommendReducer from "./adminRecommendReducer";
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
  adminRecommend: adminRecommendReducer,
  tags: tagsReducer,
  tag: tagReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
