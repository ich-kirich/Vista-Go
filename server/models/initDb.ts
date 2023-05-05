import sequelize from "../src/db";
import City from "./city";
import Recommend from "./recommend";
import Sight from "./sight";
import Tag from "./tag";

const initDb = async () => {
  Sight.belongsToMany(Tag, { through: "SightTag", as: "tags" });
  Tag.belongsToMany(Sight, { through: "SightTag" });
  Sight.belongsTo(City);
  Recommend.belongsTo(City);
  City.hasMany(Recommend);
  City.hasMany(Sight, { as: "sights" });

  await sequelize.authenticate();
  return;
};

export default initDb;
