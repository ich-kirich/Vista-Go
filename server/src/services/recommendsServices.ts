import Recommend from "../../models/recommend";
import Guide from "../../models/guide";
import City from "../../models/city";
import User from "../../models/user";

async function findRecommends() {
  const recommends = await Recommend.findAll({
    include: [
      {
        model: City,
        include: [
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
      },
    ],
  });
  return recommends;
}

export default findRecommends;
