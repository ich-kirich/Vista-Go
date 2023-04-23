import { ICities, ICity } from "../types/types";

export function createDate(date: Date) {
  return `${date.getUTCDate().toString().padStart(2, "0")}.${(
    date.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getUTCFullYear()}`;
}

export function getFindCities(cities: ICity[], nameCity: string) {
  if (nameCity) {
    return cities.filter((item) =>
      item.name.toLowerCase().includes(nameCity.toLowerCase()),
    );
  }
  return cities;
}

export function getAllCities(countries: ICities[], nameCity: string) {
  const cities: ICity[] = countries
    .flatMap((item) => item.cities)
    .map((city, index) => ({ ...city, id: index }));
  return getFindCities(cities, nameCity);
}
