import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    const users = [
      {
        name: "Admin",
        email: "adminus@gmail.com",
        password:
          "$2b$05$PGag7sTWGUYok5EGMDMMT.QLrD6MfOtBcq1C4Mysc9nZ4dTGyoSU6", // Str0ngP@ss
        image: "https://i.ibb.co/JvKSP4t/default.png",
        role: "ADMIN",
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User",
        email: "user@gmail.com",
        password:
          "$2b$05$PGag7sTWGUYok5EGMDMMT.QLrD6MfOtBcq1C4Mysc9nZ4dTGyoSU6", // Str0ngP@ss
        image: "https://i.ibb.co/JvKSP4t/default.png",
        role: "USER",
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("users", users);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
