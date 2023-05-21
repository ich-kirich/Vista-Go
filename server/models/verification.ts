import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class Verification extends Model {
  public id!: number;

  public email!: string;

  public verificationCode!: string;
}

Verification.init(
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
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "verifications",
  },
);

export default Verification;
