import React from "react";
import { IContext } from "../types/types";

export const SLIDER_SETTINGS = {
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

export const ADMIN_ROLE = "ADMIN";

export const CONTEXT = React.createContext({} as IContext);
