"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("recommends", [
      {
        id: 1,
        country: "Germany",
        name: "Berlin",
        weather: "Unknown",
        image:
        "https://sportishka.com/uploads/posts/2022-04/1650714007_66-sportishka-com-p-berlin-krasivo-foto-70.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        country: "Germany",
        name: "Hamburg",
        weather: "Unknown",
        image:
        "https://sportishka.com/uploads/posts/2022-04/1650611081_25-sportishka-com-p-gamburg-dostoprimechatelnosti-krasivo-foto-26.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        country: "Belarus",
        name: "Minsk",
        weather: "Unknown",
        image: "https://photoclub.by/images/main81/812183_main.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("recommends", null, {});
  },
};
