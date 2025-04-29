import User from "../../models/user";
import Sight from "../../models/sight";
import Tag from "../../models/tag";
import Guide from "../../models/guide";

export async function findCitySights(cityId: string) {
  const sights = await Sight.findAll({
    where: { CityId: cityId },
    include: [
      {
        model: Tag,
        as: "tags",
      },
      {
        model: Guide,
        as: "guides",
        include: [
          {
            model: User,
            as: "user",
            where: { isBanned: false },
            attributes: [],
          },
        ],
      },
    ],
  });
  return sights;
}

export async function findSight(sightId: string) {
  const sight = await Sight.findByPk(sightId, {
    include: [
      {
        model: Tag,
        as: "tags",
      },
      {
        model: Guide,
        as: "guides",
        include: [
          {
            model: User,
            as: "user",
            where: { isBanned: false },
            attributes: [],
          },
        ],
      },
    ],
  });
  return sight;
}
