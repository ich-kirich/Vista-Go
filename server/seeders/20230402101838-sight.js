"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sights", [
      {
        id: 1,
        name: "Brandenburg Gate",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/brandenburg-gate.jpg",
        CityId: 1,
        RecommendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Kaiser Wilhelm Memorial Church",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/memorial-church.jpg",
        CityId: 1,
        RecommendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Checkpoint Charlie",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/check-point-charlie.jpg",
        CityId: 1,
        RecommendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Victory Column",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/victory-column.jpg",
        CityId: 1,
        RecommendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Fish market",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/fischmarkt.jpg",
        CityId: 2,
        RecommendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "International Maritime Museum",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/international-maritime-museum.jpg",
        CityId: 2,
        RecommendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "Hagenbeck Zoo",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/tierpark-hagenbeck.jpg",
        CityId: 2,
        RecommendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "Dialogue in the Dark Museum",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/dialogue-in-the-dark.jpg",
        CityId: 2,
        RecommendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "Minsk city hall",
        image:
          "https://cdn2.tu-tu.ru/image/pagetree_node_data/1/7626cf4c8cf8a3ae72b4f08befaed79d/",
        CityId: 3,
        RecommendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "Cathedral of the Blessed Virgin Mary",
        image:
          "https://cdn2.tu-tu.ru/image/pagetree_node_data/1/911233cfca0d4314998dc46a96ef4631/",
        CityId: 3,
        RecommendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: "Gates of Minsk",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Babrujskaja%2C_Minsk.jpg/300px-Babrujskaja%2C_Minsk.jpg",
        CityId: 3,
        RecommendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: "National Library of Belarus",
        image:
          "https://upload.wikimedia.org/wikipedia/ru/thumb/0/0e/BelarusNationalLibrary.JPG/290px-BelarusNationalLibrary.JPG",
        CityId: 3,
        RecommendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: "Old Castle",
        image:
          "https://avatars.dzeninfra.ru/get-zen_doc/4498748/pub_630374203fda8341457af3b8_63037469ee54bf127b727b7b/scale_1200",
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: "Great Choral Synagogue",
        image:
          "https://avatars.dzeninfra.ru/get-zen_doc/5236269/pub_630374203fda8341457af3b8_6303751756792f4c4b5bdd5f/scale_1200",
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: "Grodno State Museum of the History of Religion",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Museum_of_religion.JPG/274px-Museum_of_religion.JPG",
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        name: "Zhiliber Park",
        image:
          "https://trippo.ru/wp-content/uploads/2021/12/Park-ZHilibera.jpg",
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        name: "Mugni Church",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-34.jpg",
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        name: "Arjeni Winery",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-44.jpg",
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        name: "Republic Square",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-1.jpg",
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        name: "Yerevan Cascade",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-3.jpg",
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        name: "Black Fortress",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/black-fortress.jpg",
        CityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        name: "Vardanants Square",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/vardanants-square.jpg",
        CityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        name: "Central Park",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/central-park.jpg",
        CityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        name: "Marmashen Monastery",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/marmashen-monastery.jpg",
        CityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sights", null, {});
  },
};
