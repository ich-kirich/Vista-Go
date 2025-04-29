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

export async function createTag(name: { en: string; ru: string }) {
  const formData = new FormData();
  addFieldsToFormData(formData, { name });
  const { data } = await adminHost.post("admin/create/tag/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteTag(id: number) {
  const { data } = await adminHost.delete(`admin/delete/tag/${id}`);
  return data;
}

export async function updateTag(
  id: number,
  name: {
    en: string;
    ru: string;
  },
) {
  const formData = new FormData();
  addFieldsToFormData(formData, { id, name });
  const { data } = await adminHost.post("admin/update/tag/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function createGuide(
  name: { en: string; ru: string },
  description: { en: string; ru: string },
  contacts: string,
  cityIds: number[],
  sightIds: number[],
  image: File,
  userId: number,
) {
  const formData = new FormData();
  addFieldsToFormData(formData, {
    name,
    image,
    description,
    contacts,
    cityIds,
    sightIds,
    userId,
  });
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
  name: {
    en: string;
    ru: string;
  },
  image: File | undefined,
  description: {
    en: string;
    ru: string;
  },
  contacts: string,
  cityIds: number[],
  sightIds: number[],
) {
  const formData = new FormData();
  addFieldsToFormData(formData, {
    name,
    id,
    image,
    description,
    contacts,
    cityIds,
    sightIds,
  });
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

export async function banUser(email: string) {
  console.log(banUser);
  const formData = new FormData();
  addFieldsToFormData(formData, { email });
  const { data } = await adminHost.post("admin/ban/user/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function unBanUser(email: string) {
  const formData = new FormData();
  addFieldsToFormData(formData, { email });
  const { data } = await adminHost.post("admin/unban/user/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function getUsers() {
  const response = await adminHost.get("admin/users/");
  return response;
}
