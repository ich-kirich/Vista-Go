import Recommend from "../../models/recommend";
import City from "../../models/city";

async function findRecommends() {
  const recommends = await Recommend.findAll({
    include: [
      {
        model: City,
      },
    ],
  });
  return recommends;
}

export default findRecommends;
