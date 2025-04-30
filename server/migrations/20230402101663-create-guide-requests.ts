import { QueryInterface, DataTypes } from "sequelize";
import { GUIDES_REQUEST_STATUS } from "../src/libs/constants";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("guide_requests", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      contacts: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      requestText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          GUIDES_REQUEST_STATUS.APPROVED,
          GUIDES_REQUEST_STATUS.REJECTED,
          GUIDES_REQUEST_STATUS.PENDING,
        ),
        allowNull: false,
        defaultValue: GUIDES_REQUEST_STATUS.PENDING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("guide_requests");
  },
};
