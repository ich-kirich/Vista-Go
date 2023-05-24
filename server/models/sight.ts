import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class Sight extends Model {
  public id!: number;

  public name!: string;

  public image!: string;

  public description!: string;

  public price!: string;

  public distance!: string;
}

Sight.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: sequelize.literal("(SELECT MAX(id) FROM sights) + 1"),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(2048),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distance: {
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
