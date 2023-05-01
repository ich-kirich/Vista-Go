import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";
import Sight from "./sight";

class Recommend extends Model {
  public id!: number;

  public country!: string;

  public name!: string;

  public weather!: string;

  public image!: string;

  public sight?: Sight[];
}

Recommend.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weather: {
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
    tableName: "recommends",
  },
);

export default Recommend;
