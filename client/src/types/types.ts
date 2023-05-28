import Slider from "react-slick";
import { ERROR } from "../libs/constants";

export type CustomError = {
  response: {
    data: {
      message: keyof typeof ERROR;
    };
  };
};

export interface IAction {
  type: string;
  payload?: any;
}

export interface ITag {
  id: number;
  name: string;
}

export interface ITagsState {
  tags: ITag[];
  loading: boolean;
  error: null | string;
}

export interface ITagState {
  tag: ITag;
  loading: boolean;
  error: null | string;
}

export interface IGuide {
  id: number;
  name: string;
  image: string;
}

export interface IGuidesState {
  guides: IGuide[];
  loading: boolean;
  error: null | string;
}

export interface IGuideState {
  guide: IGuide;
  loading: boolean;
  error: null | string;
}

export interface ISights {
  id: number;
  name: string;
  image: string;
  description: string;
  distance: string;
  price: string;
  tags: ITag[];
}

export interface ISightsState {
  sights: ISights[];
  loading: boolean;
  error: null | string;
}

export interface ISightState {
  sight: ISights;
  loading: boolean;
  error: null | string;
}

export interface ICities {
  id: number;
  country: string;
  name: string;
  weather: string;
  image: string;
  sights: ISights[];
  guides: IGuide[];
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
  CityId: number;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  image: string;
  role: string;
}

export interface IRecommendsState {
  recommends: IRecommends[];
  loading: boolean;
  error: null | string;
}

export interface IRecommendState {
  recommend: IRecommends | string;
  loading: boolean;
  error: null | string;
}

export interface IUserState {
  user: IUser;
  loading: boolean;
  error: null | string;
}

export interface IAuthState {
  isAuth: boolean;
}

export interface IRegistrationState {
  loading: boolean;
  error: null | string;
}

export interface ICodepassState {
  res: string;
  loading: boolean;
  error: null | string;
}

export interface ICode {
  id: number;
  email: string;
  verificationCode: string;
}

export interface ICodeState {
  code: ICode;
  loading: boolean;
  error: null | string;
}

export interface IContext {
  nameCity: string;
  visible: boolean;
  setVisible: Function;
}

export interface IChildernProps {
  children: React.ReactNode;
  className?: string;
}

export interface ICityProps {
  city: ICities;
}

export interface IRecommendCartProps {
  recommend: IRecommends;
  sliderRef: React.RefObject<Slider>;
  currentSlide: number;
  setCurrentSlide: Function;
  idsRecommends: number[];
}

export interface IListCitiesProps {
  cities: ICities[];
}

export interface IListRecommendsProps {
  recommends: IRecommends[];
}

export interface IModalComponentProps extends IChildernProps {
  visible: boolean;
  setVisible: Function;
}

export interface ISearchFieldProps {
  setNameCity: Function;
  nameCity: string;
}

export interface ISightProps {
  sight: ISights;
}

export interface IListSightsProps {
  sights: ISights[];
}

export interface IChangeUsernameProps {
  visible: boolean;
  setVisible: Function;
  userId: number | undefined;
}

export interface IVerificationFieldProps {
  name: string;
  email: string;
  password: string;
}

export interface IChangePasswordProps {
  visible: boolean;
  setVisible: Function;
  email: string | undefined;
}

export interface IVerificationPassword {
  email: string;
  password: string;
  setVisible: Function;
}

export interface IRecoveryPassword {
  setVisible: Function;
}
