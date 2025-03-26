import axios from "axios";
import { LocalStorageKeys } from "../libs/enums";

export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const adminHost = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    LocalStorageKeys.TOKEN,
  )}`;
  return config;
};

adminHost.interceptors.request.use(authInterceptor);
