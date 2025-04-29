import Guide from "../../models/guide";
import User from "../../models/user";
import City from "../../models/city";
import Sight from "../../models/sight";

export async function findGuides() {
  const guides = await Guide.findAll({
    include: [
      {
        model: User,
        as: "user",
        where: { isBanned: false },
        attributes: [],
      },
      {
        model: City,
        as: "cities",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
      {
        model: Sight,
        as: "sights",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });

  return guides;
}

export default findGuides;
