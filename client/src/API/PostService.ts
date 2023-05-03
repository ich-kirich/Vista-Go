import api from "./Axios";

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
