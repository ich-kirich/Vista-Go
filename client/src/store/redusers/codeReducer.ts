import { CODE, INITIAL_CODE } from "../../libs/constants";
import { IAction, ICodeState } from "../../types/types";

const initialState: ICodeState = {
  code: INITIAL_CODE,
  loading: false,
  error: null,
};

const codeReducer = (
  state: ICodeState = initialState,
  action: IAction,
): ICodeState => {
  switch (action.type) {
    case CODE.FETCH_CODE:
      return { loading: true, error: null, code: INITIAL_CODE };
    case CODE.FETCH_CODE_SUCCESS:
      return { loading: false, error: null, code: action.payload };
    case CODE.FETCH_CODE_ERROR:
      return {
        loading: false,
        error: action.payload,
        code: INITIAL_CODE,
      };
    default:
      return state;
  }
};

export default codeReducer;
