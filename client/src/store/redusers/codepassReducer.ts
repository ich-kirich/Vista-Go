import { CODEPASS } from "../../libs/constants";
import { IAction, ICodepassState } from "../../types/types";

const initialState: ICodepassState = {
  res: "",
  loading: false,
  error: null,
};

const codepassReducer = (
  state: ICodepassState = initialState,
  action: IAction,
): ICodepassState => {
  switch (action.type) {
    case CODEPASS.FETCH_CODEPASS:
      return { loading: true, error: null, res: "" };
    case CODEPASS.FETCH_CODEPASS_SUCCESS:
      return { loading: false, error: null, res: action.payload };
    case CODEPASS.FETCH_CODEPASS_ERROR:
      return {
        loading: false,
        error: action.payload,
        res: "",
      };
    default:
      return state;
  }
};

export default codepassReducer;
