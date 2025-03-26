import { Tags } from "../../libs/enums";
import { IAction, ITag } from "../../types/types";

interface ITagsState {
  tags: ITag[] | null;
  loading: boolean;
  error: null | string;
}

const initialState: ITagsState = {
  tags: null,
  loading: false,
  error: null,
};

const tagsReducer = (
  state: ITagsState = initialState,
  action: IAction,
): ITagsState => {
  switch (action.type) {
    case Tags.FETCH_TAGS:
      return { loading: true, error: null, tags: null };
    case Tags.FETCH_TAGS_SUCCESS:
      return { loading: false, error: null, tags: action.payload };
    case Tags.FETCH_TAGS_ERROR:
      return {
        loading: false,
        error: action.payload,
        tags: null,
      };
    default:
      return state;
  }
};

export default tagsReducer;
