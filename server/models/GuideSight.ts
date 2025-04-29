import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class GuideSight extends Model {
  public SightId!: number;

  public GuideId!: number;
}

GuideSight.init(
  {
    GuideId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "guides",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    SightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sights",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "guide_sight",
  },
);

export default GuideSight;
