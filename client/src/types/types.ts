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
  city: ICities[];
  loading: boolean;
  error: null | string;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IChildernProps {
  children: React.ReactNode;
  className?: string;
}
