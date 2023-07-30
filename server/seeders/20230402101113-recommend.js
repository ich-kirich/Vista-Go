"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("recommends", [
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
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("recommends", null, {});
  },
};
