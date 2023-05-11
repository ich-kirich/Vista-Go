import { INITIAL_GUIDES, GUIDES } from "../../libs/constants";
import { IAction, IGuidesState } from "../../types/types";

const initialState: IGuidesState = {
  guides: INITIAL_GUIDES,
  loading: false,
  error: null,
};

const guidesReducer = (
  state: IGuidesState = initialState,
  action: IAction,
): IGuidesState => {
  switch (action.type) {
    case GUIDES.FETCH_GUIDES:
      return { loading: true, error: null, guides: INITIAL_GUIDES };
    case GUIDES.FETCH_GUIDES_SUCCESS:
      return { loading: false, error: null, guides: action.payload };
    case GUIDES.FETCH_GUIDES_ERROR:
      return {
        loading: false,
        error: action.payload,
        guides: INITIAL_GUIDES,
      };
    default:
      return state;
  }
};

export default guidesReducer;
