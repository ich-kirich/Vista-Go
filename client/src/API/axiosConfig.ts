import axios from "axios";

export const publciApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

authApi.interceptors.request.use(authInterceptor);
