import { Dispatch } from "redux";
import { createCity } from "../../api/adminService";
import { CITY } from "../../libs/constants";
import { IAction } from "../../types/types";

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
    } catch (e: any) {
      dispatch({
        type: CITY.FETCH_CITY_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};

export default fetchCreateCity;
