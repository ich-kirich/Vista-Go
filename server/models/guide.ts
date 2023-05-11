import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class Guide extends Model {
  public name!: string;

  public image!: string;
}

Guide.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
