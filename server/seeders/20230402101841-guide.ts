import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    const guides = [
      {
        name: "Andrey Medvedik",
        image: "https://i.ibb.co/Nd9MBTwd/andr.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Stepan Naymkin",
        image: "https://i.ibb.co/rKfg9BX0/stepank.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Anna Kravchenko",
        image: "https://i.ibb.co/7Jqt17cm/kravchenko.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Olga Levchenko",
        image: "https://i.ibb.co/hxD5KqZD/levchenko.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Maria Schmidt",
        image: "https://i.ibb.co/Rk9B1pMM/schmidt.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jan Mueller",
        image: "https://i.ibb.co/YTK1PnZM/mueller.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lena Wagner",
        image: "https://i.ibb.co/gHRCTN6/wagner.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Max Schulz",
        image: "https://i.ibb.co/cc9f3X4H/schulz.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mark Arutyunyan",
        image: "https://i.ibb.co/q35kQzyd/arutyunyan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Artur Avetisyan",
        image: "https://i.ibb.co/Tx7KHtk2/avetisyan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Narek Arutyunyan",
        image: "https://i.ibb.co/tfpQnyB/arutyunyan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Angela Abramyan",
        image: "https://i.ibb.co/Kcqv7r2S/abramyan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("guides", guides);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("guides", null, {});
  },
};
