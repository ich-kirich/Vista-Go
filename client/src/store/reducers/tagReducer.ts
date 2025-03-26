import { Tag } from "../../libs/enums";
import { IAction, ITag } from "../../types/types";

interface ITagState {
  tag: ITag | null;
  loading: boolean;
  error: null | string;
}

const initialState: ITagState = {
  tag: null,
  loading: false,
  error: null,
};

const tagReducer = (
  state: ITagState = initialState,
  action: IAction,
): ITagState => {
  switch (action.type) {
    case Tag.FETCH_TAG:
      return { loading: true, error: null, tag: null };
    case Tag.FETCH_TAG_SUCCESS:
      return { loading: false, error: null, tag: action.payload };
    case Tag.FETCH_TAG_ERROR:
      return {
        loading: false,
        error: action.payload,
        tag: null,
      };
    default:
      return state;
  }
};

export default tagReducer;
