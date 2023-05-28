import { Dispatch } from "redux";
import { updateSight } from "../../api/adminService";
import { ERROR, SIGHT } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchUpdateSight = (
  id: number,
  name: string,
  description: string,
  price: string,
  distance: string,
  tagIds: number[],
  image: File | undefined,
) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: SIGHT.FETCH_SIGHT });
      const response = await updateSight(
        id,
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

export default fetchUpdateSight;
