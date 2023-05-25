import { Dispatch } from "redux";
import { createSight } from "../../api/adminService";
import { SIGHT } from "../../libs/constants";
import { IAction } from "../../types/types";

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
    } catch (e: any) {
      dispatch({
        type: SIGHT.FETCH_SIGHT_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchCreateSight;
