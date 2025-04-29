import config from "config";
import Guide from "../../models/guide";
import City from "../../models/city";
import Sight from "../../models/sight";
import Tag from "../../models/tag";
import { getWeather } from "../libs/utils";
import logger from "../libs/logger";
import User from "../../models/user";

export async function findCity(cityId: string) {
  const city = await City.findOne({
    where: { id: cityId },
    include: [
      {
        model: Sight,
        as: "sights",
        include: [
          {
            model: Tag,
            as: "tags",
          },
        ],
      },
      {
        model: Guide,
        as: "guides",
        include: [
          {
            model: User,
            as: "user",
            where: { isBanned: false },
            attributes: [],
          },
        ],
      },
    ],
  });
  const cityWeatherRequest = new Date(city.dataValues.weatherLastRequest);
  const now = new Date();
  const diffInMinutes = Math.round(
    (now.getTime() - cityWeatherRequest.getTime()) / (1000 * 60),
  );
  const timeRequestWeather: number = config.get("weather.timeRequestWeather");
  if (diffInMinutes > timeRequestWeather) {
    logger.info("There was a request to the api to get the weather");
    const cityWeather = await getWeather(
      city.dataValues.lat,
      city.dataValues.lon,
    );
    await city.update({
      weather: cityWeather,
      weatherLastRequest: new Date(),
    });
  }
  return city;
}

export async function findCities() {
  const cities = await City.findAll({
    include: [
      {
        model: Sight,
        as: "sights",
      },
      {
        model: Guide,
        as: "guides",
        include: [
          {
            model: User,
            as: "user",
            where: { isBanned: false },
            attributes: [],
          },
        ],
      },
    ],
  });
  return cities;
}
