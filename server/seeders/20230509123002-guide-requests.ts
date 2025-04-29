import { QueryInterface } from "sequelize";
import { GUIDES_REQUEST_STATUS } from "../src/libs/constants";

export default {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();

    const guideRequests = [
      {
        userId: 2,
        contacts: "user@gmail.com, telegram: @userguide",
        description: "I have been a tour guide for 3 years in Moscow.",
        requestText: "I'd love to join your guide platform and help tourists.",
        status: GUIDES_REQUEST_STATUS.PENDING,
        createdAt: now,
        updatedAt: now,
      },
    ];

    await queryInterface.bulkInsert("guide_requests", guideRequests);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("guide_requests", null, {});
  },
};
