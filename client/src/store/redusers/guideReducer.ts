import { INITIAL_GUIDE, GUIDE } from "../../libs/constants";
import { IAction, IGuideState } from "../../types/types";

const initialState: IGuideState = {
  guide: INITIAL_GUIDE,
  loading: false,
  error: null,
};

const guideReducer = (
  state: IGuideState = initialState,
  action: IAction,
): IGuideState => {
  switch (action.type) {
    case GUIDE.FETCH_GUIDE:
      return { loading: true, error: null, guide: INITIAL_GUIDE };
    case GUIDE.FETCH_GUIDE_SUCCESS:
      return { loading: false, error: null, guide: action.payload };
    case GUIDE.FETCH_GUIDE_ERROR:
      return {
        loading: false,
        error: action.payload,
        guide: INITIAL_GUIDE,
      };
    default:
      return state;
  }
};

export default guideReducer;
