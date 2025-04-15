import { QueryInterface } from "sequelize";
const prepareTranslations = (en: string, ru: string) => ({
  en,
  ru,
});

export default {
  up: async (queryInterface: QueryInterface) => {
    const cities = [
      {
        country: prepareTranslations("Germany", "Германия"),
        name: prepareTranslations("Berlin", "Берлин"),
        weather: "Unknown",
        image: "https://i.ibb.co/FLbfT67t/berlin.png",
        lat: "52.52",
        lon: "13.40",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        country: prepareTranslations("Germany", "Германия"),
        name: prepareTranslations("Hamburg", "Гамбург"),
        weather: "Unknown",
        image: "https://i.ibb.co/QFDQ11gj/hamburg.png",
        lat: "53.5511",
        lon: "9.9937",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        country: prepareTranslations("Belarus", "Беларусь"),
        name: prepareTranslations("Minsk", "Минск"),
        weather: "Unknown",
        image: "https://i.ibb.co/VWpRgDXt/minsk.png",
        lat: "53.9045",
        lon: "27.5615",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        country: prepareTranslations("Belarus", "Беларусь"),
        name: prepareTranslations("Grodno", "Гродно"),
        weather: "Unknown",
        image: "https://i.ibb.co/rG633xgK/grodno.png",
        lat: "53.6688",
        lon: "23.8298",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        country: prepareTranslations("Armenia", "Армения"),
        name: prepareTranslations("Yerevan", "Ереван"),
        weather: "Unknown",
        image: "https://i.ibb.co/dJ77kNV7/yerevan.png",
        lat: "40.1811",
        lon: "44.5136",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        country: prepareTranslations("Armenia", "Армения"),
        name: prepareTranslations("Gyumri", "Гюмри"),
        weather: "Unknown",
        image: "https://i.ibb.co/spjKM1tR/gyumri.png",
        lat: "40.7884",
        lon: "43.8469",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const preparedCities = cities.map((city) => ({
      ...city,
      country: JSON.stringify(city.country),
      name: JSON.stringify(city.name),
    }));

    await queryInterface.bulkInsert("cities", preparedCities);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("cities", null, {});
  },
};
