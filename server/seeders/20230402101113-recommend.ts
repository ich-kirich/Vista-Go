import { QueryInterface, Sequelize } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    const recommends = [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        CityId: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        CityId: 4,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        CityId: 6,
      },
    ];

    await queryInterface.bulkInsert("recommends", recommends);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("recommends", null, {});
  },
};
