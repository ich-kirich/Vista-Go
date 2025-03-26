import { Guides } from "../../libs/enums";
import { IAction, IGuide } from "../../types/types";

interface IGuidesState {
  guides: IGuide[] | null;
  loading: boolean;
  error: null | string;
}

const initialState: IGuidesState = {
  guides: null,
  loading: false,
  error: null,
};

const guidesReducer = (
  state: IGuidesState = initialState,
  action: IAction,
): IGuidesState => {
  switch (action.type) {
    case Guides.FETCH_GUIDES:
      return { loading: true, error: null, guides: null };
    case Guides.FETCH_GUIDES_SUCCESS:
      return { loading: false, error: null, guides: action.payload };
    case Guides.FETCH_GUIDES_ERROR:
      return {
        loading: false,
        error: action.payload,
        guides: null,
      };
    default:
      return state;
  }
};

export default guidesReducer;
