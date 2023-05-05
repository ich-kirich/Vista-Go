import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";
import Sight from "./sight";

class Recommend extends Model {
  public id!: number;
}

Recommend.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "recommends",
  },
);

export default Recommend;
