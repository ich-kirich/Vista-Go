import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

class Tag extends Model {
  public name!: string;
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: sequelize.literal("(SELECT MAX(id) FROM tags) + 1"),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tags",
  },
);

export default Tag;
