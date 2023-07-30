import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class SightTag extends Model {
  public SightId!: number;

  public TagId!: number;
}

SightTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
    },
    TagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
    },
  },
  { sequelize, modelName: "sighttags" },
);

export default SightTag;
