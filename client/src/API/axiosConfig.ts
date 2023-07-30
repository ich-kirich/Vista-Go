import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const adminHost = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

adminHost.interceptors.request.use(authInterceptor);
