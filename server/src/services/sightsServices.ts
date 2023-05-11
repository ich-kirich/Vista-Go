import Guide from "../../models/guide";
import Sight from "../../models/sight";
import Tag from "../../models/tag";

export async function findCitySights(cityId: string) {
  const sights = await Sight.findAll({
    where: { CityId: cityId },
    include: [
      {
        model: Tag,
        as: "tags",
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
    ],
  });
  return sight;
}
