import { QueryInterface, DataTypes } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("tags", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          en: "",
          ru: "",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("tags");
  },
};
