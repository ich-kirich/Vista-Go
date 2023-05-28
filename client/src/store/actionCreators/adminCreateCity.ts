import { Dispatch } from "redux";
import { createCity } from "../../api/adminService";
import { CITY, ERROR } from "../../libs/constants";
import { CustomError, IAction } from "../../types/types";

const fetchCreateCity = (
  country: string,
  name: string,
  lat: string,
  lon: string,
  sightIds: number[],
  guideIds: number[],
  image: File,
) => {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({ type: CITY.FETCH_CITY });
      const response = await createCity(
        country,
        name,
        lat,
        lon,
        sightIds,
        guideIds,
        image,
      );
      dispatch({
        type: CITY.FETCH_CITY_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const error = e as CustomError;
      const errorMessage =
        ERROR[error.response.data.message] || error.response.data.message;
      dispatch({
        type: CITY.FETCH_CITY_ERROR,
        payload: errorMessage,
      });
    }
  };
};

export default fetchCreateCity;
