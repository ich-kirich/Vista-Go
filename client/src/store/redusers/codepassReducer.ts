import { CODEPASS } from "../../libs/constants";
import { IAction } from "../../types/types";

interface ICodepassState {
  res: string | null;
  loading: boolean;
  error: null | string;
}

const initialState: ICodepassState = {
  res: null,
  loading: false,
  error: null,
};

const codepassReducer = (
  state: ICodepassState = initialState,
  action: IAction,
): ICodepassState => {
  switch (action.type) {
    case CODEPASS.FETCH_CODEPASS:
      return { loading: true, error: null, res: null };
    case CODEPASS.FETCH_CODEPASS_SUCCESS:
      return { loading: false, error: null, res: action.payload };
    case CODEPASS.FETCH_CODEPASS_ERROR:
      return {
        loading: false,
        error: action.payload,
        res: null,
      };
    default:
      return state;
  }
};

export default codepassReducer;
