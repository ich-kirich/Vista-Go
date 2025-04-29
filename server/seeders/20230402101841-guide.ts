import { QueryInterface, Sequelize, QueryTypes } from "sequelize";

const prepareTranslations = (en: string, ru: string) => ({
  en,
  ru,
});

export default {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    const now = new Date();

    const users: { id: number; email: string }[] =
      await queryInterface.sequelize.query(
        `SELECT id, email FROM users WHERE role = 'GUIDE';`,
        { type: QueryTypes.SELECT },
      );

    const userMap: { [email: string]: number } = {};
    users.forEach((user) => {
      userMap[user.email] = user.id;
    });

    const guides = [
      {
        name: prepareTranslations("Andrey Udilny", "Андрей Удильный"),
        description: prepareTranslations(
          "Experienced guide in Lucerne.",
          "Опытный гид в Люцерне.",
        ),
        image: "https://i.ibb.co/Nd9MBTwd/andr.png",
        contacts: "andrey@example.com",
        userId: userMap["andrey@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Stepan Naymkin", "Степан Наумкин"),
        description: prepareTranslations(
          "Expert in Swiss history.",
          "Эксперт по истории Швейцарии.",
        ),
        image: "https://i.ibb.co/rKfg9BX0/stepank.png",
        contacts: "stepan@example.com",
        userId: userMap["stepan@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Anna Kravchenko", "Анна Кравченко"),
        description: prepareTranslations(
          "Passionate about Swiss culture.",
          "Увлечена швейцарской культурой.",
        ),
        image: "https://i.ibb.co/7Jqt17cm/kravchenko.png",
        contacts: "anna@example.com",
        userId: userMap["anna@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Olga Levchenko", "Ольга Левченко"),
        description: prepareTranslations(
          "Specialist in mountain tours.",
          "Специалист по горным турам.",
        ),
        image: "https://i.ibb.co/hxD5KqZD/levchenko.png",
        contacts: "olga@example.com",
        userId: userMap["olga@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Maria Schmidt", "Мария Шмидт"),
        description: prepareTranslations(
          "Knowledgeable in architecture.",
          "Знает всё об архитектуре.",
        ),
        image: "https://i.ibb.co/Rk9B1pMM/schmidt.png",
        contacts: "maria@example.com",
        userId: userMap["maria@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Jan Mueller", "Ян Мюллер"),
        description: prepareTranslations(
          "Fluent in 4 languages.",
          "Говорит на 4 языках.",
        ),
        image: "https://i.ibb.co/YTK1PnZM/mueller.png",
        contacts: "jan@example.com",
        userId: userMap["jan@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Lena Wagner", "Лена Вагнер"),
        description: prepareTranslations(
          "Loves Swiss nature.",
          "Обожает природу Швейцарии.",
        ),
        image: "https://i.ibb.co/gHRCTN6/wagner.png",
        contacts: "lena@example.com",
        userId: userMap["lena@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Max Schulz", "Макс Шульц"),
        description: prepareTranslations(
          "Historical landmarks expert.",
          "Эксперт по историческим достопримечательностям.",
        ),
        image: "https://i.ibb.co/cc9f3X4H/schulz.png",
        contacts: "max@example.com",
        userId: userMap["max@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Mark Arutyunyan", "Марк Арутюнян"),
        description: prepareTranslations(
          "Experienced in large group tours.",
          "Опыт работы с большими группами.",
        ),
        image: "https://i.ibb.co/q35kQzyd/arutyunyan.png",
        contacts: "mark@example.com",
        userId: userMap["mark@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Artur Avetisyan", "Артур Аветисян"),
        description: prepareTranslations(
          "Focuses on cultural experiences.",
          "Сфокусирован на культурных турах.",
        ),
        image: "https://i.ibb.co/Tx7KHtk2/avetisyan.png",
        contacts: "artur@example.com",
        userId: userMap["artur@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Narek Arutyunyan", "Нарек Арутюнян"),
        description: prepareTranslations(
          "Nature and hiking expert.",
          "Эксперт по природе и хайкингу.",
        ),
        image: "https://i.ibb.co/tfpQnyB/arutyunyan.png",
        contacts: "narek@example.com",
        userId: userMap["narek@example.com"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: prepareTranslations("Angela Abramyan", "Анжела Абрамян"),
        description: prepareTranslations(
          "Great with kids and families.",
          "Отлично работает с детьми и семьями.",
        ),
        image: "https://i.ibb.co/Kcqv7r2S/abramyan.png",
        contacts: "angela@example.com",
        userId: userMap["angela@example.com"],
        createdAt: now,
        updatedAt: now,
      },
    ];

    const preparedGuides = guides.map((guide) => ({
      ...guide,
      name: JSON.stringify(guide.name),
      description: JSON.stringify(guide.description),
    }));

    await queryInterface.bulkInsert("guides", preparedGuides);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("guides", null, {});
  },
};
