import { ICities } from "../types/types";
import { ROUTES } from "./constants";

export function createDate(date: Date) {
  return `${date.getUTCDate().toString().padStart(2, "0")}.${(
    date.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getUTCFullYear()}`;
}

export function getFindCities(cities: ICities[], nameCity: string) {
  if (nameCity) {
    return cities.filter((item) =>
      item.name.toLowerCase().includes(nameCity.toLowerCase()),
    );
  }
  return cities;
}

export function addFieldsToFormData(
  formData: FormData,
  params: Record<string, any>,
) {
  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value.length !== 0
    ) {
      if (Array.isArray(value)) {
        const arrayValue = JSON.stringify(value);
        formData.append(key, String(arrayValue));
      } else {
        formData.append(key, value);
      }
    }
  });
}

export const getRoute = (
  route: ROUTES,
  params: Record<string, string | number>,
) => {
  let path: string = route;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, String(value));
  });
  return path;
};
