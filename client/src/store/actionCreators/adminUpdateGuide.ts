import { Dispatch } from "redux";
import { updateGuide } from "../../api/adminService";
import { GUIDE } from "../../libs/constants";
import { IAction } from "../../types/types";

const fetchUpdateGuide = (id: number, name: string, file: File | undefined) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: GUIDE.FETCH_GUIDE });
      const response = await updateGuide(id, name, file);
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

export default fetchUpdateGuide;
