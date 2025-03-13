import { GUIDE } from "../../libs/constants";
import { IAction, IGuide } from "../../types/types";

interface IGuideState {
  guide: IGuide | null;
  loading: boolean;
  error: null | string;
}

const initialState: IGuideState = {
  guide: null,
  loading: false,
  error: null,
};

const guideReducer = (
  state: IGuideState = initialState,
  action: IAction,
): IGuideState => {
  switch (action.type) {
    case GUIDE.FETCH_GUIDE:
      return { loading: true, error: null, guide: null };
    case GUIDE.FETCH_GUIDE_SUCCESS:
      return { loading: false, error: null, guide: action.payload };
    case GUIDE.FETCH_GUIDE_ERROR:
      return {
        loading: false,
        error: action.payload,
        guide: null,
      };
    default:
      return state;
  }
};

export default guideReducer;
