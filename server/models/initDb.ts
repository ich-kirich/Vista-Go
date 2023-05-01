import sequelize from "../src/db";
import City from "./city";
import Recommend from "./recommend";
import Sight from "./sight";
import Tag from "./tag";

const initDb = async () => {
  Tag.belongsTo(Sight);
  Sight.hasMany(Tag, { as: "tags" });
  Sight.belongsTo(City);
  Sight.belongsTo(Recommend);
  Recommend.hasMany(Sight, { as: "sights" });
  City.hasMany(Sight, { as: "sights" });

  await sequelize.authenticate();
  return;
};

export default initDb;
