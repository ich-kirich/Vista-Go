import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";
import { GUIDES_REQUEST_STATUS } from "../src/libs/constants";

class GuideRequest extends Model {
  public userId!: number;

  public contacts!: string;

  public description!: string;

  public requestText!: string;

  public status!: string;
}

GuideRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contacts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        GUIDES_REQUEST_STATUS.APPROVED,
        GUIDES_REQUEST_STATUS.REJECTED,
        GUIDES_REQUEST_STATUS.PENDING,
      ),
      defaultValue: GUIDES_REQUEST_STATUS.PENDING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "guide_requests",
  },
);

export default GuideRequest;
