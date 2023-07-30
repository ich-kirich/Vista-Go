import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/redusers/combineReducer";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
