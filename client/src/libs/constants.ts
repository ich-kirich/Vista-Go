import { ICities } from "../types/types";

export const INITIAL_CITY: ICities[] = [
  {
    id: 0,
    country: "Unknown",
    cities: [
      {
        id: 0,
        name: "Unknown",
        weather: 0,
        sights: [
          {
            id: 0,
            name: "Unknown",
            image: "Unknown",
            tags: [],
          },
        ],
      },
    ],
  },
];

export enum CITY {
  FETCH_CITY = "FETCH_CITY",
  FETCH_CITY_SUCCESS = "FETCH_CITY_SUCCESS",
  FETCH_CITY_ERROR = "FETCH_CITY_ERROR",
}
