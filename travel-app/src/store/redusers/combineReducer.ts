import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import recommendReducer from "./recommendReducer";

export const rootReducer = combineReducers({
  city: cityReducer,
  recommend: recommendReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
