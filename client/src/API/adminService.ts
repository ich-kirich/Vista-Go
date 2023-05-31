import { addFieldsToFormData } from "../libs/utils";
import {
  ICreateCity,
  ICreateSight,
  IUpdateCity,
  IUpdateSight,
} from "../types/types";
import { adminHost } from "./axiosConfig";

export async function createRecommend(cityId: number) {
  const { data } = await adminHost.post("admin/create/recommend", {
    cityId,
  });
  return data;
}

export async function deleteRecommend(id: number) {
  const { data } = await adminHost.delete(`admin/delete/recommend/${id}`);
  return data;
}

export async function createTag(name: string) {
  const { data } = await adminHost.post("admin/create/tag/", {
    name,
  });
  return data;
}

export async function deleteTag(id: number) {
  const { data } = await adminHost.delete(`admin/delete/tag/${id}`);
  return data;
}

export async function updateTag(id: number, name: string) {
  const { data } = await adminHost.post("admin/update/tag/", {
    id,
    name,
  });
  return data;
}

export async function createGuide(name: string, image: File) {
  const formData = new FormData();
  addFieldsToFormData(formData, { name, image });
  const { data } = await adminHost.post("admin/create/guide/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteGuide(id: number) {
  const { data } = await adminHost.delete(`admin/delete/guide/${id}`);
  return data;
}

export async function updateGuide(
  id: number,
  name: string,
  image: File | undefined,
) {
  const formData = new FormData();
  addFieldsToFormData(formData, { name, id, image });
  const { data } = await adminHost.post("admin/update/guide/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function createSight(params: ICreateSight) {
  const formData = new FormData();
  addFieldsToFormData(formData, params);
  const { data } = await adminHost.post("admin/create/sight/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteSight(id: number) {
  const { data } = await adminHost.delete(`admin/delete/sight/${id}`);
  return data;
}

export async function updateSight(params: IUpdateSight) {
  const formData = new FormData();
  addFieldsToFormData(formData, params);

  const { data } = await adminHost.post("admin/update/sight/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function createCity(params: ICreateCity) {
  const formData = new FormData();
  addFieldsToFormData(formData, params);
  const { data } = await adminHost.post("admin/create/city/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteCity(id: number) {
  const { data } = await adminHost.delete(`admin/delete/city/${id}`);
  return data;
}

export async function updateCity(params: IUpdateCity) {
  const formData = new FormData();
  addFieldsToFormData(formData, params);
  const { data } = await adminHost.post("admin/update/city/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
