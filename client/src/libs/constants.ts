import React from "react";
import { IContext } from "../types/types";

export const SLIDER_SETTINGS = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 1,
  centerMode: true,
  variableWidth: true,
};

export const CONTEXT = React.createContext({} as IContext);

export const LOCAL_STORAGE_KEY_SPINNER_DATE = "spinnerDate";
export const LOCAL_STORAGE_KEY_SPINNER_INDEX = "spinnerIndex";

export const CLEAR_REDUX__ERRORS = "CLEAR_ERRORS";
