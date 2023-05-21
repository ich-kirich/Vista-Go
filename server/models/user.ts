import { DataTypes, Model } from "sequelize";
import { DEFAULT_URL_IMG } from "../src/libs/constants";
import sequelize from "../src/db";

class User extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  public image!: string;
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DEFAULT_URL_IMG,
    },
  },
  {
    sequelize,
    tableName: "users",
  },
);

export default User;
