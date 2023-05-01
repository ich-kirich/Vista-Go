import React from "react";
import { ICities, IContext, IRecommends } from "../types/types";

export const INITIAL_CITY: ICities = {
  id: 1,
  country: "Unknown",
  name: "Unknown",
  weather: "Unknown",
  image: "Unknown",
  sights: [],
};

export const INITIAL_RECOMMEND: IRecommends = {
  id: 1,
  country: "Unknown",
  name: "Unknown",
  weather: "Unknown",
  image: "Unknown",
  updatedAt: "Unknown",
  sights: [],
};

export const INITIAL_CITIES: ICities[] = [
  {
    id: 1,
    country: "Unknown",
    name: "Unknown",
    weather: "Unknown",
    image: "Unknown",
  },
];

export const INITIAL_RECOMMENDS: IRecommends[] = [
  {
    id: 1,
    country: "Unknown",
    name: "Unknown",
    weather: "Unknown",
    image: "Unknown",
    updatedAt: "Unknown",
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

export enum CITIES {
  FETCH_CITIES = "FETCH_CITIES",
  FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS",
  FETCH_CITIES_ERROR = "FETCH_CITIES_ERROR",
}

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

export enum RECOMMEND {
  FETCH_RECOMMEND = "FETCH_RECOMMEND",
  FETCH_RECOMMEND_SUCCESS = "FETCH_RECOMMEND_SUCCESS",
  FETCH_RECOMMEND_ERROR = "FETCH_RECOMMEND_ERROR",
}

export const CONTEXT = React.createContext({} as IContext);
