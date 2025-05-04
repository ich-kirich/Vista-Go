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
          "Expert guide in Grodno specializing in the Old Castle and Kalozha Church",
          "Эксперт по Гродно с экскурсиями по Старому замку и Коложской церкви",
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
          "Minsk history expert showcasing Independence Avenue and Trinity Suburb",
          "Эксперт по истории Минска с экскурсиями по проспекту Независимости и Троицкому предместью",
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
          "Cultural tours of Minsk including National Opera and Yakub Kolas Square",
          "Экскурсии по культуре Минска включая Оперный театр и площадь Якуба Коласа",
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
          "Grodno specialist for Augustów Canal and Neman River boat tours",
          "Специалист по Гродно с лодочными турами по каналу Августов и Неману",
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
          "Berlin architecture expert for Brandenburg Gate and Reichstag tours",
          "Эксперт по архитектуре Берлина с экскурсиями к Бранденбургским воротам и Рейхстагу",
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
          "Multilingual Berlin guide for Museum Island and Checkpoint Charlie",
          "Многоязычный гид по Берлину с турами на Музейном острове и Чекпойнт Чарли",
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
          "Hamburg's nature specialist for Alster Lake and Stadtpark tours",
          "Специалист по природе Гамбурга с экскурсиями на озеро Альстер и в Штадтпарк",
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
          "Hamburg history expert for Speicherstadt and Elbphilharmonie tours",
          "Эксперт по истории Гамбурга с турами по Шпайхерштадту и Эльбфилармонии",
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
          "Yerevan group tours to Cascade Complex and Republic Square",
          "Экскурсии для групп по Еревану к Каскаду и Площади Республики",
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
          "Yerevan cultural tours including Matenadaran and Vernissage Market",
          "Культурные туры по Еревану включая Матенадаран и Вернисаж",
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
          "Gyumri hiking expert for Sev Berd Fortress and Black Fortress trails",
          "Эксперт по хайкингу в Гюмри с маршрутами к крепости Сев Берд и Чёрной крепости",
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
          "Family-friendly Gyumri tours to Dzitoghtsyan Museum and Kumayri district",
          "Семейные туры по Гюмри с посещением музея Дзитохцяна и квартала Кумайри",
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
