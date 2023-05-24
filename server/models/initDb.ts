import sequelize from "../src/db";
import City from "./city";
import CityGuide from "./cityGuide";
import Guide from "./guide";
import Recommend from "./recommend";
import Sight from "./sight";
import SightTag from "./sightTag";
import Tag from "./tag";

const initDb = async () => {
  Sight.belongsToMany(Tag, {
    through: SightTag,
    as: "tags",
  });
  Tag.belongsToMany(Sight, { through: SightTag });
  City.belongsToMany(Guide, { through: CityGuide, as: "guides" });
  Guide.belongsToMany(City, { through: CityGuide });
  Sight.belongsTo(City);
  Recommend.belongsTo(City);
  City.hasMany(Recommend);
  City.hasMany(Sight, { as: "sights" });

  await sequelize.authenticate();
  return;
};

export default initDb;
