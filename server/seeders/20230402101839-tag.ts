import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    const tags = [
      { name: "Landmark", createdAt: new Date(), updatedAt: new Date() },
      { name: "Architecture", createdAt: new Date(), updatedAt: new Date() },
      { name: "History", createdAt: new Date(), updatedAt: new Date() },
      { name: "Religion", createdAt: new Date(), updatedAt: new Date() },
      { name: "Empire", createdAt: new Date(), updatedAt: new Date() },
      { name: "Checkpoint", createdAt: new Date(), updatedAt: new Date() },
      { name: "Berlin Wall", createdAt: new Date(), updatedAt: new Date() },
      { name: "Column", createdAt: new Date(), updatedAt: new Date() },
      { name: "Victory", createdAt: new Date(), updatedAt: new Date() },
      { name: "Fish", createdAt: new Date(), updatedAt: new Date() },
      { name: "Market", createdAt: new Date(), updatedAt: new Date() },
      { name: "Meal", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sea", createdAt: new Date(), updatedAt: new Date() },
      { name: "Museum", createdAt: new Date(), updatedAt: new Date() },
      { name: "Zoo", createdAt: new Date(), updatedAt: new Date() },
      { name: "Animals", createdAt: new Date(), updatedAt: new Date() },
      { name: "Science", createdAt: new Date(), updatedAt: new Date() },
      { name: "Life", createdAt: new Date(), updatedAt: new Date() },
      { name: "Hall", createdAt: new Date(), updatedAt: new Date() },
      { name: "Administration", createdAt: new Date(), updatedAt: new Date() },
      { name: "Gates", createdAt: new Date(), updatedAt: new Date() },
      { name: "Library", createdAt: new Date(), updatedAt: new Date() },
      { name: "Castle", createdAt: new Date(), updatedAt: new Date() },
      { name: "The Middle Ages", createdAt: new Date(), updatedAt: new Date() },
      { name: "Park", createdAt: new Date(), updatedAt: new Date() },
      { name: "Nature", createdAt: new Date(), updatedAt: new Date() },
      { name: "Winery", createdAt: new Date(), updatedAt: new Date() },
      { name: "Wine", createdAt: new Date(), updatedAt: new Date() },
      { name: "Square", createdAt: new Date(), updatedAt: new Date() },
      { name: "Beauty", createdAt: new Date(), updatedAt: new Date() },
      { name: "Fortress", createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert("tags", tags);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
