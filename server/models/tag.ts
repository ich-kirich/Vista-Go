import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class Tag extends Model {
  public name!: object;
}

Tag.init(
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
  },
  {
    sequelize,
    tableName: "tags",
  },
);

export default Tag;
