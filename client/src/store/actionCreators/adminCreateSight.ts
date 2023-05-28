import { Dispatch } from "redux";
import { createSight } from "../../api/adminService";
import { ERROR, SIGHT } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchCreateSight = (
  name: string,
  description: string,
  price: string,
  distance: string,
  tagIds: number[],
  image: File,
) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHT.FETCH_SIGHT });
      const response = await createSight(
        name,
        description,
        price,
        distance,
        tagIds,
        image,
      );
      dispatch({
        type: SIGHT.FETCH_SIGHT_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: SIGHT.FETCH_SIGHT_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchCreateSight;
