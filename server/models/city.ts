import { DataTypes, Model } from "sequelize";
import { DEFAULT_WEATHER } from "../src/libs/constants";
import sequelize from "../src/db";

class City extends Model {
  public id!: number;
  public country!: object;
  public name!: object;
  public weather!: string;
  public image!: string;
  public lat!: string;
  public lon!: string;
  public weatherLastRequest!: Date;
}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: { en: "", ru: "" },
      get() {
        const rawValue = this.getDataValue("country");
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      },
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
    weather: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DEFAULT_WEATHER,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weatherLastRequest: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    tableName: "cities",
  },
);

export default City;
