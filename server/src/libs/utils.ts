import axios from "axios";
import config from "config";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";

async function getWeather(city: string) {
  const apiKey = config.get("weather.apiKey");
  try {
    const response = await axios.get(
      `  https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );
    return String(response.data.main.temp);
  } catch (e) {
    return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
  }
}

export default getWeather;
