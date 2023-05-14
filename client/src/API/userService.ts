import jwt_decode from "jwt-decode";
import { publciApi, authApi } from "./axiosConfig";

export async function registrationUser(
  name: string,
  email: string,
  password: string,
) {
  const { data } = await publciApi.post("user/registration", {
    email,
    password,
    name,
  });
  localStorage.setItem("token", data);
  return jwt_decode(data);
}

export async function loginUser(email: string, password: string) {
  const { data } = await publciApi.post("user/login", { email, password });
  localStorage.setItem("token", data);
  return jwt_decode(data);
}

export async function checkUser() {
  const { data } = await authApi.get("user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
}
