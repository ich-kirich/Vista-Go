import axios from "axios";

export const publciApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default publciApi;
