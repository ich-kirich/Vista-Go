import { Dispatch } from "redux";
import { updateGuide } from "../../api/adminService";
import { ERROR, GUIDE } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchUpdateGuide = (id: number, name: string, file: File | undefined) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: GUIDE.FETCH_GUIDE });
      const response = await updateGuide(id, name, file);
      dispatch({
        type: GUIDE.FETCH_GUIDE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: GUIDE.FETCH_GUIDE_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchUpdateGuide;
