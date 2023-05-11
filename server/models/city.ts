import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";
import Sight from "./sight";

class City extends Model {
  public id!: number;

  public country!: string;

  public name!: string;

  public weather!: string;

  public image!: string;

  public lat!: string;

  public lon!: string;

  public weatherLastRequest!: Date;

  public sights?: Sight[];
}

City.init(
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
    },
  },
  {
    sequelize,
    tableName: "cities",
  },
);

export default City;
