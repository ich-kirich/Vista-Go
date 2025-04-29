import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();

    const citySights = {
      1: [1, 2, 3, 4], // Berlin
      2: [5, 6, 7, 8], // Hamburg
      3: [9, 10, 11, 12], // Minsk
      4: [13, 14, 15, 16, 17], // Grodno
      5: [18, 19, 20], // Yerevan
      6: [21, 22, 23, 24, 25], // Gyumri
    };

    const cityGuides = {
      1: [5, 6],
      2: [7, 8],
      3: [2, 3],
      4: [1, 4],
      5: [9, 10],
      6: [11, 12],
    };

    const guideSight = [];

    Object.entries(citySights).forEach(([cityId, sights]) => {
      const guides = cityGuides[parseInt(cityId)];
      const guideCount = guides.length;

      sights.forEach((SightId, index) => {
        const assignedGuide = guides[index % guideCount];
        guideSight.push({
          GuideId: assignedGuide,
          SightId,
          createdAt: now,
          updatedAt: now,
        });
      });
    });

    await queryInterface.bulkInsert("guide_sight", guideSight);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("guide_sight", null, {});
  },
};
