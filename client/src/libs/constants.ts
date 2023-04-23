import React from "react";
import { ICities, IContext } from "../types/types";

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

export const SETTINGS = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  centerMode: true,
  variableWidth: true,
};

export enum CITY {
  FETCH_CITY = "FETCH_CITY",
  FETCH_CITY_SUCCESS = "FETCH_CITY_SUCCESS",
  FETCH_CITY_ERROR = "FETCH_CITY_ERROR",
}

export enum RECOMMENDS {
  FETCH_RECOMMENDS = "FETCH_RECOMMENDS",
  FETCH_RECOMMENDS_SUCCESS = "FETCH_RECOMMENDS_SUCCESS",
  FETCH_RECOMMENDS_ERROR = "FETCH_RECOMMENDS_ERROR",
}

export const CONTEXT = React.createContext({} as IContext);
