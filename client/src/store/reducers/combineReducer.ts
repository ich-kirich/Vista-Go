import { AnyAction, combineReducers } from "redux";
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
import { CLEAR_REDUX__ERRORS } from "../../libs/constants";

const combinedReducer = combineReducers({
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

export const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === CLEAR_REDUX__ERRORS) {
    const newState = { ...state };
    action.payload.forEach((domain: any) => {
      if (newState[domain]) {
        newState[domain] = { ...newState[domain], error: null };
      }
    });
    return newState;
  }
  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof combinedReducer>;
