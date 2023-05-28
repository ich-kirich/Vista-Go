import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class CityGuide extends Model {
  public CityId!: number;

  public GuideId!: number;
}

CityGuide.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cities",
        key: "id",
      },
    },
    GuideId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "guides",
        key: "id",
      },
    },
  },
  { sequelize, modelName: "cityguides" },
);

export default CityGuide;
