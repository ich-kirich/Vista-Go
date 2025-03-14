import { CODE } from "../../libs/constants";
import { IAction, ICode } from "../../types/types";

interface ICodeState {
  code: ICode | null;
  loading: boolean;
  error: null | string;
}

const initialState: ICodeState = {
  code: null,
  loading: false,
  error: null,
};

const codeReducer = (
  state: ICodeState = initialState,
  action: IAction,
): ICodeState => {
  switch (action.type) {
    case CODE.FETCH_CODE:
      return { loading: true, error: null, code: null };
    case CODE.FETCH_CODE_SUCCESS:
      return { loading: false, error: null, code: action.payload };
    case CODE.FETCH_CODE_ERROR:
      return {
        loading: false,
        error: action.payload,
        code: null,
      };
    default:
      return state;
  }
};

export default codeReducer;
