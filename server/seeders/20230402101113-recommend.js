"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("recommends", [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        CityId: 2,
      },
      {
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        CityId: 4,
      },
      {
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        CityId: 6,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("recommends", null, {});
  },
};
