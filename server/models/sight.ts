import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class Sight extends Model {
  public id!: number;

  public name!: object;

  public image!: string;

  public description!: object;

  public price!: string;

  public distance!: string;
}

Sight.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: { en: "", ru: "" },
      get() {
        const rawValue = this.getDataValue("name");
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: { en: "", ru: "" },
      get() {
        const rawValue = this.getDataValue("description");
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      },
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
