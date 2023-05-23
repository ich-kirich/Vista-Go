import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class Guide extends Model {
  public id!: number;

  public name!: string;

  public image!: string;
}

Guide.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: sequelize.literal("(SELECT MAX(id) FROM guides) + 1"),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "guides",
  },
);

export default Guide;
