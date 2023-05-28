import { Dispatch } from "redux";
import { createRecommend } from "../../api/adminService";
import { ERROR, RECOMMEND } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchAddRecommend = (cityId: number) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: RECOMMEND.FETCH_RECOMMEND });
      const response = await createRecommend(cityId);
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: RECOMMEND.FETCH_RECOMMEND_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchAddRecommend;
