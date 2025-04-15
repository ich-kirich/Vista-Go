import { QueryInterface } from "sequelize";

const prepareTranslations = (en: string, ru: string) => ({
  en,
  ru,
});

export default {
  up: async (queryInterface: QueryInterface) => {
    const tags = [
      {
        name: prepareTranslations("Landmark", "Достопримечательность"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Architecture", "Архитектура"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("History", "История"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Religion", "Религия"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Empire", "Империя"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Checkpoint", "КПП"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Berlin Wall", "Берлинская стена"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Column", "Колонна"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Victory", "Победа"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Fish", "Рыба"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Market", "Рынок"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Meal", "Еда"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Sea", "Море"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Museum", "Музей"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Zoo", "Зоопарк"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Animals", "Животные"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Science", "Наука"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Life", "Жизнь"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Hall", "Зал"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Administration", "Администрация"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Gates", "Ворота"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Library", "Библиотека"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Castle", "Замок"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("The Middle Ages", "Средние века"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Park", "Парк"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Nature", "Природа"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Winery", "Винодельня"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Wine", "Вино"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Square", "Площадь"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Beauty", "Красота"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Fortress", "Крепость"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const preparedTags = tags.map((tag) => ({
      ...tag,
      name: JSON.stringify(tag.name),
    }));

    await queryInterface.bulkInsert("tags", preparedTags);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
