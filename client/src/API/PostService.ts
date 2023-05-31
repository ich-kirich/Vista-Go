import { api } from "./axiosConfig";

export async function getCities() {
  const response = await api.get("/cities");
  return response;
}

export async function getRecommends() {
  const response = await api.get("/recommends");
  return response;
}

export async function getCity(id: string) {
  const response = await api.get(`/cities/${id}`);
  return response;
}

export async function getSights(id: string) {
  const response = await api.get(`/${id}/sights`);
  return response;
}

export async function getSight(id: string) {
  const response = await api.get(`/sights/${id}`);
  return response;
}

export async function getAllSights() {
  const response = await api.get("/sights");
  return response;
}

export async function getGuides() {
  const response = await api.get("/guides");
  return response;
}

export async function getTags() {
  const response = await api.get(`/tags`);
  return response;
}
