import axios from "axios";
import config from "config";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";

export async function getWeather(lat: string, lon: string) {
  const apiKey = config.get("weather.apiKey");
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    );
    return String(response.data.main.temp);
  } catch (e) {
    return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
  }
}

export function mergeCityFields(arr: any) {
  return arr.map((item) => {
    const { City, ...rest } = item.dataValues;
    const result = { ...City.dataValues, ...rest };
    return result;
  });
}

export function generateJwt(
  id: number,
  email: string,
  name: string,
  image?: string,
) {
  return jwt.sign({ id, email, name, image }, config.get("jwt.secretKey"), {
    expiresIn: "24h",
  });
}
