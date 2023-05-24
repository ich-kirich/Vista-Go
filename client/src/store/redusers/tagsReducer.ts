import { TAGS } from "../../libs/constants";
import { IAction, ITagsState } from "../../types/types";

const initialState: ITagsState = {
  tags: [],
  loading: false,
  error: null,
};

const tagsReducer = (
  state: ITagsState = initialState,
  action: IAction,
): ITagsState => {
  switch (action.type) {
    case TAGS.FETCH_TAGS:
      return { loading: true, error: null, tags: [] };
    case TAGS.FETCH_TAGS_SUCCESS:
      return { loading: false, error: null, tags: action.payload };
    case TAGS.FETCH_TAGS_ERROR:
      return {
        loading: false,
        error: action.payload,
        tags: [],
      };
    default:
      return state;
  }
};

export default tagsReducer;
