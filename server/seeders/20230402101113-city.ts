import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    const cities = [
      {
        country: "Germany",
        name: "Berlin",
        weather: "Unknown",
        image: "https://i.ibb.co/FLbfT67t/berlin.png",
        lat: "52.52",
        lon: "13.40",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        country: "Germany",
        name: "Hamburg",
        weather: "Unknown",
        image: "https://i.ibb.co/QFDQ11gj/hamburg.png",
        lat: "53.5511",
        lon: "9.9937",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        country: "Belarus",
        name: "Minsk",
        weather: "Unknown",
        image: "https://i.ibb.co/VWpRgDXt/minsk.png",
        lat: "53.9045",
        lon: "27.5615",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        country: "Belarus",
        name: "Grodno",
        weather: "Unknown",
        image: "https://i.ibb.co/rG633xgK/grodno.png",
        lat: "53.6688",
        lon: "23.8298",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        country: "Armenia",
        name: "Yerevan",
        weather: "Unknown",
        image: "https://i.ibb.co/dJ77kNV7/yerevan.png",
        lat: "40.1811",
        lon: "44.5136",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        country: "Armenia",
        name: "Gyumri",
        weather: "Unknown",
        image: "https://i.ibb.co/spjKM1tR/gyumri.png",
        lat: "40.7884",
        lon: "43.8469",
        weatherLastRequest: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("cities", cities);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("cities", null, {});
  },
};
