import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class Recommend extends Model {
  public id!: number;
}

Recommend.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: sequelize.literal("(SELECT MAX(id) FROM recommends) + 1"),
    },
  },
  {
    sequelize,
    tableName: "recommends",
  },
);

export default Recommend;
