import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class VerificationUser extends Model {
  public id!: number;

  public email!: string;

  public name: string;

  public password!: string;

  public verificationCode!: string;
}

VerificationUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "verificationsusers",
  },
);

export default VerificationUser;
