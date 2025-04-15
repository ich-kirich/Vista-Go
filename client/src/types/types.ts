import { AppError } from "../libs/enums";

export type CustomError = {
  response: {
    data: {
      message: keyof typeof AppError;
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

export interface IGuide {
  id: number;
  name: string;
  image: string;
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

export interface ICities {
  id: number;
  country: {
    en: string;
    ru: string;
  };
  name: {
    en: string;
    ru: string;
  };
  weather: string;
  image: string;
  sights: ISights[];
  guides: IGuide[];
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

export interface ICode {
  id: number;
  email: string;
  verificationCode: string;
}

export interface IContext {
  nameCity: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export interface IVerifyUser {
  name: string;
  email: string;
  code: string;
}

export interface ICreateSight {
  name: string;
  description: string;
  price: string;
  distance: string;
  tagIds: number[];
  image: File;
}

export interface IUpdateSight {
  id: number;
  name: string;
  description: string;
  price: string;
  distance: string;
  tagIds: number[];
  image: File | undefined;
}

export interface ICreateCity {
  country: {
    en: string;
    ru: string;
  };
  name: {
    en: string;
    ru: string;
  };
  lat: string;
  lon: string;
  sightIds: number[];
  guideIds: number[];
  image: File;
}

export interface IUpdateCity {
  id: number;
  country: {
    en: string;
    ru: string;
  };
  name: {
    en: string;
    ru: string;
  };
  lat: string;
  lon: string;
  sightIds: number[];
  guideIds: number[];
  image: File | undefined;
}

export interface IChildrenProps {
  children: React.ReactNode;
  className?: string;
}

export interface IListCitiesProps {
  cities: ICities[];
}

export interface IModalComponentProps extends IChildrenProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export interface ISightProps {
  sight: ISights;
}

export interface IChangeUsernameProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
