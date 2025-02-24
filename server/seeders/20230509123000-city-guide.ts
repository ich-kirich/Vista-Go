import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    const cityGuides = [
      {
        CityId: 1,
        GuideId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 1,
        GuideId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 2,
        GuideId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 2,
        GuideId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 3,
        GuideId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 3,
        GuideId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 4,
        GuideId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 4,
        GuideId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 5,
        GuideId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 5,
        GuideId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 6,
        GuideId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CityId: 6,
        GuideId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("cityguides", cityGuides);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("cityguides", null, {});
  },
};
