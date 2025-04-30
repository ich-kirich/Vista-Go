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
  const response = await api.get(`/city/${id}`);
  return response;
}

export async function getCitySights(cityId: string) {
  const response = await api.get(`sights/city/${cityId}`);
  return response;
}

export async function getSight(sightId: string) {
  const response = await api.get(`/sights/${sightId}`);
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

export async function getGuide(id: number) {
  const response = await api.get(`/guides/${id}`);
  return response;
}
