import { CLEAR_REDUX__ERRORS } from "../../libs/constants";
import { RootState } from "../reducers/combineReducer";

export const clearErrors = (domains: Array<keyof RootState>) => ({
  type: CLEAR_REDUX__ERRORS,
  payload: domains,
});
