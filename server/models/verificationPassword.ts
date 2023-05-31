import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class VerificationPassword extends Model {
  public id!: number;

  public email!: string;

  public password!: string;

  public verificationCode!: string;
}

VerificationPassword.init(
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
    tableName: "verificationspassword",
  },
);

export default VerificationPassword;
