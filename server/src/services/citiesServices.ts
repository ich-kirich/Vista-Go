import { Sequelize } from "sequelize";
import Recommend from "../../models/recommend";
import City from "../../models/city";
import Sight from "../../models/sight";
import Tag from "../../models/tag";
import getWeather from "../libs/utils";

export async function findCity(cityId: string) {
  const city = await City.findOne({
    where: { id: cityId },
    include: {
      model: Sight,
      as: "sights",
      include: [
        {
          model: Tag,
          as: "tags",
        },
      ],
    },
  });
  city.dataValues.weather = await getWeather(
    city.dataValues.lat,
    city.dataValues.lon,
  );
  return city;
}

export async function findCities() {
  const cities = await City.findAll();
  return cities;
}

export async function findRecommends() {
  const recommends = await Recommend.findAll({
    include: [
      {
        model: City,
      },
    ],
  });
  return recommends;
}
