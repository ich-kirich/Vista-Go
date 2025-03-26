import jwt_decode from "jwt-decode";
import { IVerifyUser } from "../types/types";
import { adminHost } from "./axiosConfig";

export async function registrationUser(
  name: string,
  email: string,
  password: string,
) {
  const { data } = await adminHost.post("user/registration", {
    email,
    password,
    name,
  });
  return data;
}

export async function loginUser(email: string, password: string) {
  const { data } = await adminHost.post("user/login", { email, password });
  localStorage.setItem("token", data);
  return jwt_decode(data);
}

export async function changeNameUser(name: string) {
  const { data } = await adminHost.post("user/update/name", { name });
  localStorage.setItem("token", data);
  return jwt_decode(data);
}

export async function changeImageUser(image: File) {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await adminHost.post("user/update/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  localStorage.setItem("token", data);
  return jwt_decode(data);
}

export async function verifyUser(params: IVerifyUser) {
  const { email, code } = params;
  const { data } = await adminHost.post("user/verification/check", {
    email,
    code,
  });
  localStorage.setItem("token", data);
  return jwt_decode(data);
}

export async function createCodePassword(email: string, newPassword: string) {
  const { data } = await adminHost.post("user/password/change", {
    email,
    password: newPassword,
  });
  return data;
}

export async function checkCodePassword(email: string, code: string) {
  const { data } = await adminHost.post("user/password/check", {
    email,
    code,
  });
  return data;
}
