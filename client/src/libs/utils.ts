import jwt_decode, { JwtPayload } from "jwt-decode";
import { ICities, IUser } from "../types/types";
import { AppError, Locales, LocalStorageKeys, Routes } from "./enums";

export function createDate(date: Date) {
  return `${date.getUTCDate().toString().padStart(2, "0")}.${(
    date.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getUTCFullYear()}`;
}

export function getFindCities(
  cities: ICities[],
  nameCity: string,
  language: Locales,
) {
  if (nameCity) {
    return cities.filter((item) =>
      item.name[language]?.toLowerCase().includes(nameCity.toLowerCase()),
    );
  }
  return cities;
}

export function addFieldsToFormData(
  formData: FormData,
  params: Record<string, any>,
) {
  Object.entries(params).forEach(([key, value]) => {
    if (value == null || value === "") return;

    if (typeof value === "object" && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });
}

export const getRoute = (
  route: Routes,
  params: Record<string, string | number>,
) => {
  let path: string = route;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, String(value));
  });
  return path;
};

export function getValidToken(): (IUser & JwtPayload) | null {
  const token = localStorage.getItem(LocalStorageKeys.TOKEN);

  if (!token) {
    return null;
  }

  try {
    const decoded: IUser & JwtPayload = jwt_decode(token);

    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

export function validateName(name: string): string | null {
  // eslint-disable-next-line no-useless-escape
  const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;

  if (!nameRegex.test(name) || /^[-\s]+$/.test(name)) {
    return AppError.INVALID_NAME;
  }

  return null;
}

export const validateLat = (value: string): string | null => {
  const lat = parseFloat(value);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    return AppError.INVALID_LATITUDE;
  }
  return null;
};

export const validateLon = (value: string): string | null => {
  const lon = parseFloat(value);
  if (isNaN(lon) || lon < -180 || lon > 180) {
    return AppError.INVALID_LONGITUDE;
  }
  return null;
};
