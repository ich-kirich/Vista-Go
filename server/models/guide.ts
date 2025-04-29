import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class Guide extends Model {
  public id!: number;

  public name!: object;

  public image!: string;

  public userId: number;

  public contacts: string;

  public description: object;
}

Guide.init(
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
    description: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: { en: "", ru: "" },
      get() {
        const rawValue = this.getDataValue("description");
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contacts: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "guides",
  },
);

export default Guide;
