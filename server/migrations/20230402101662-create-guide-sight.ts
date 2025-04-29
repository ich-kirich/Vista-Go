import { QueryInterface, DataTypes } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("guide_sight", {
      GuideId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "guides",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
      },
      SightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sights",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
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
    await queryInterface.dropTable("guide_sight");
  },
};
