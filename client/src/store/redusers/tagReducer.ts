import { TAG, INITIAL_TAG } from "../../libs/constants";
import { IAction, ITagState } from "../../types/types";

const initialState: ITagState = {
  tag: INITIAL_TAG,
  loading: false,
  error: null,
};

const tagReducer = (
  state: ITagState = initialState,
  action: IAction,
): ITagState => {
  switch (action.type) {
    case TAG.FETCH_TAG:
      return { loading: true, error: null, tag: INITIAL_TAG };
    case TAG.FETCH_TAG_SUCCESS:
      return { loading: false, error: null, tag: action.payload };
    case TAG.FETCH_TAG_ERROR:
      return {
        loading: false,
        error: action.payload,
        tag: INITIAL_TAG,
      };
    default:
      return state;
  }
};

export default tagReducer;
