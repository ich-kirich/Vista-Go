import { publciApi } from "./axiosConfig";

export async function getCities() {
  const response = await publciApi.get("/cities");
  return response;
}

export async function getRecommends() {
  const response = await publciApi.get("/recommends");
  return response;
}

export async function getCity(id: string) {
  const response = await publciApi.get(`/cities/${id}`);
  return response;
}

export async function getSights(id: string) {
  const response = await publciApi.get(`/${id}/sights`);
  return response;
}

export async function getSight(id: string) {
  const response = await publciApi.get(`/sights/${id}`);
  return response;
}

export async function getGuides() {
  const response = await publciApi.get(`/guides`);
  return response;
}
