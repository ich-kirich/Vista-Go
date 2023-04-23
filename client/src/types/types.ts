import Slider from "react-slick";

export interface IStatictic {
  id: number;
  date: Date | string;
  ip: string;
  region: string;
  browserName: string;
  browserVersion: string;
  os: string;
  LinkId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISights {
  id: number;
  name: string;
  image: string;
  tags: string[];
}

export interface ICity {
  id: number;
  name: string;
  weather: number;
  sights: ISights[];
}

export interface ICities {
  id: number;
  country: string;
  cities: ICity[];
}

export interface ICityState {
  countries: ICities[];
  loading: boolean;
  error: null | string;
}

export interface IRecommendState {
  recommend: ICities[];
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
  city: ICity;
}

export interface IRecommendCartProps {
  recommend: ICities;
  sliderRef: React.RefObject<Slider>;
}

export interface IListCountryCitiesProps {
  cities: ICity[];
  setCountry: Function;
}

export interface IModalComponentProps extends IChildernProps {
  visible: boolean;
  setVisible: Function;
  setCountry: Function;
}

export interface ISearchFieldProps {
  setNameCity: Function;
  nameCity: string;
}
