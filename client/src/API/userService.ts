import jwt_decode from "jwt-decode";
import { api } from "./axiosConfig";

export async function registrationUser(
  name: string,
  email: string,
  password: string,
) {
  const { data } = await api.post("user/registration", {
    email,
    password,
    name,
  });
  localStorage.setItem("token", data);
  return jwt_decode(data);
}

export async function loginUser(email: string, password: string) {
  const { data } = await api.post("user/login", { email, password });
  localStorage.setItem("token", data);
  return jwt_decode(data);
}

export async function changeNameUser(id: number, name: string) {
  const { data } = await api.post("user/update/name", { id, name });
  localStorage.setItem("token", data);
  return jwt_decode(data);
}
