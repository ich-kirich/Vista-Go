import { Dispatch } from "redux";
import { createGuide } from "../../api/adminService";
import { GUIDE } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchCreateGuide = (name: string, file: File) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: GUIDE.FETCH_GUIDE });
      const response = await createGuide(name, file);
      dispatch({
        type: GUIDE.FETCH_GUIDE_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch({
        type: GUIDE.FETCH_GUIDE_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchCreateGuide;
