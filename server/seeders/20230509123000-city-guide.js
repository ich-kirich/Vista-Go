"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("CityGuide", [
      {
        id: 1,
        CityId: 1,
        GuideId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        CityId: 1,
        GuideId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        CityId: 2,
        GuideId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        CityId: 2,
        GuideId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        CityId: 3,
        GuideId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        CityId: 3,
        GuideId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        CityId: 4,
        GuideId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        CityId: 4,
        GuideId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        CityId: 5,
        GuideId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        CityId: 5,
        GuideId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        CityId: 6,
        GuideId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        CityId: 6,
        GuideId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("CityGuide", null, {});
  },
};
