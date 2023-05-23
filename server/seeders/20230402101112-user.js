"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "Admin",
        email: "adminus@gmail.com",
        password: "$2b$05$PGag7sTWGUYok5EGMDMMT.QLrD6MfOtBcq1C4Mysc9nZ4dTGyoSU6",
        image: "https://i.ibb.co/JvKSP4t/default.png",
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
