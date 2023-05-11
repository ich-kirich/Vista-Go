import Recommend from "../../models/recommend";
import Guide from "../../models/guide";
import City from "../../models/city";

async function findRecommends() {
  const recommends = await Recommend.findAll({
    include: [
      {
        model: City,
        include: [
          {
            model: Guide,
            as: "guides",
          },
        ],
      },
    ],
  });
  return recommends;
}

export default findRecommends;
