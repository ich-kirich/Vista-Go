import Slider from "react-slick";

interface ITag {
  id: number;
  name: string;
}

export interface ISights {
  id: number;
  name: string;
  image: string;
  description: string;
  tags: ITag[];
}

export interface ICities {
  id: number;
  country: string;
  name: string;
  weather: string;
  image: string;
  sights?: ISights[];
}

export interface ICitiesState {
  cities: ICities[];
  loading: boolean;
  error: null | string;
}

export interface ICityState {
  city: ICities;
  loading: boolean;
  error: null | string;
}

export interface IRecommends extends ICities {
  updatedAt: string;
}

export interface IRecommendState {
  recommend: IRecommends;
  loading: boolean;
  error: null | string;
}

export interface IRecommendsState {
  recommends: IRecommends[];
  loading: boolean;
  error: null | string;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IContext {
  nameCity: string;
  visible: boolean;
  setVisible: Function;
  setNameCity: Function;
}

export interface IChildernProps {
  children: React.ReactNode;
  className?: string;
}

export interface ICityProps {
  city: ICities;
}

export interface IRecommendCartProps {
  recommend: IRecommends | ICities;
  sliderRef: React.RefObject<Slider>;
  currentSlide: number;
  setCurrentSlide: Function;
}

export interface IListCitiesProps {
  cities: ICities[];
}

export interface IModalComponentProps extends IChildernProps {
  visible: boolean;
  setVisible: Function;
}

export interface ISearchFieldProps {
  setNameCity: Function;
  nameCity: string;
}
