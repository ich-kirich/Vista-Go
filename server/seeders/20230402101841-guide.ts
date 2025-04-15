import { QueryInterface } from "sequelize";

const prepareTranslations = (en: string, ru: string) => ({
  en,
  ru,
});

export default {
  up: async (queryInterface: QueryInterface) => {
    const guides = [
      {
        name: prepareTranslations("Andrey Medvedik", "Андрей Медведик"),
        image: "https://i.ibb.co/Nd9MBTwd/andr.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Stepan Naymkin", "Степан Наумкин"),
        image: "https://i.ibb.co/rKfg9BX0/stepank.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Anna Kravchenko", "Анна Кравченко"),
        image: "https://i.ibb.co/7Jqt17cm/kravchenko.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Olga Levchenko", "Ольга Левченко"),
        image: "https://i.ibb.co/hxD5KqZD/levchenko.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Maria Schmidt", "Мария Шмидт"),
        image: "https://i.ibb.co/Rk9B1pMM/schmidt.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Jan Mueller", "Ян Мюллер"),
        image: "https://i.ibb.co/YTK1PnZM/mueller.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Lena Wagner", "Лена Вагнер"),
        image: "https://i.ibb.co/gHRCTN6/wagner.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Max Schulz", "Макс Шульц"),
        image: "https://i.ibb.co/cc9f3X4H/schulz.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Mark Arutyunyan", "Марк Арутюнян"),
        image: "https://i.ibb.co/q35kQzyd/arutyunyan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Artur Avetisyan", "Артур Аветисян"),
        image: "https://i.ibb.co/Tx7KHtk2/avetisyan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Narek Arutyunyan", "Нарек Арутюнян"),
        image: "https://i.ibb.co/tfpQnyB/arutyunyan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Angela Abramyan", "Анжела Абрамян"),
        image: "https://i.ibb.co/Kcqv7r2S/abramyan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const preparedGuides = guides.map((guide) => ({
      ...guide,
      name: JSON.stringify(guide.name),
    }));

    await queryInterface.bulkInsert("guides", preparedGuides);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("guides", null, {});
  },
};
