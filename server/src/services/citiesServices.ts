import axios from "axios";
import config from "config";
import Recommend from "../../models/recommend";
import City from "../../models/city";
import Sight from "../../models/sight";
import Tag from "../../models/tag";

async function getWeather(city: string) {
  const apiKey = config.get("weather.apiKey");
  const response = await axios.get(
    `  https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
  );
  return String(response.data.main.temp);
}

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
  city.dataValues.weather = await getWeather(city.dataValues.name);
  return city;
}

export async function findRecommend(recommendId: string) {
  const recommend = await Recommend.findOne({
    where: { id: recommendId },
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
  recommend.dataValues.weather = await getWeather(recommend.dataValues.name);
  return recommend;
}

export async function findCities() {
  const cities = await City.findAll();
  return cities;
}

export async function findRecommends() {
  const recommends = await Recommend.findAll();
  return recommends;
}
