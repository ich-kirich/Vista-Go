import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";
import Tag from "./tag";

class Sight extends Model {
  public name!: string;

  public image!: string;

  public tags?: Tag[];
}

Sight.init(
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
    tableName: "sights",
  },
);

export default Sight;
