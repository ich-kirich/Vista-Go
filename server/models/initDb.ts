import logger from "../src/libs/logger";
import sequelize from "../src/db";
import City from "./city";
import CityGuide from "./cityGuide";
import Guide from "./guide";
import Recommend from "./recommend";
import Sight from "./sight";
import SightTag from "./sightTag";
import Tag from "./tag";
import User from "./user";
import GuideSight from "./GuideSight";
import GuideRequest from "./guideRequest";

const initDb = async () => {
  Sight.belongsToMany(Tag, {
    through: SightTag,
    as: "tags",
  });
  Tag.belongsToMany(Sight, { through: SightTag });
  City.belongsToMany(Guide, { through: CityGuide, as: "guides" });
  Guide.belongsToMany(City, { through: CityGuide, as: "cities" });
  Guide.belongsToMany(Sight, { through: GuideSight, as: "sights" });
  Sight.belongsToMany(Guide, { through: GuideSight, as: "guides" });
  Sight.belongsTo(City, { foreignKey: "CityId", as: "city" });
  Recommend.belongsTo(City);
  City.hasMany(Recommend);
  City.hasMany(Sight, { as: "sights" });
  User.hasOne(Guide, { foreignKey: "userId", as: "guideProfile" });
  Guide.belongsTo(User, { foreignKey: "userId", as: "user" });
  GuideRequest.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(GuideRequest, { foreignKey: "userId" });

  await sequelize.authenticate();
  logger.info("Database connection established successfully");
  return;
};

export default initDb;
