import axios from "axios";

export async function getCities() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/cities`);
  return response;
}

export async function getRecommends() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/recommends`,
  );
  return response;
}
