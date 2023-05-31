import { StatusCodes } from "http-status-codes";
import { UploadedFile } from "express-fileupload";
import ApiError from "../error/apiError";
import { ERROR } from "../libs/constants";
import Guide from "../../models/guide";
import { uploadImage } from "../libs/utils";
import Tag from "../../models/tag";
import Sight from "../../models/sight";
import SightTag from "../../models/sightTag";
import City from "../../models/city";
import CityGuide from "../../models/cityGuide";
import Recommend from "../../models/recommend";
import {
  ICreateRecordCity,
  ICreateRecordSight,
  IUpdateRecordCity,
  IUpdateRecordSight,
} from "../types/types";
import logger from "../libs/logger";

export async function createRecordGuide(image: UploadedFile, name: string) {
  const loadImage = await uploadImage(image);
  const guide = await Guide.create({ name, image: loadImage });
  return guide;
}

export async function updateRecordGuide(
  id: number,
  name: string,
  image: UploadedFile,
) {
  const findGuide = await Guide.findByPk(id);
  if (!findGuide) {
    logger.error(`Guide with this ID: ${id} was not found`);
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.GUIDE_NOT_FOUND);
  }
  if (name) {
    await Guide.update({ name }, { where: { id } });
  }
  if (image) {
    const loadImage = await uploadImage(image);
    await Guide.update({ image: loadImage }, { where: { id } });
  }
  const guide = await Guide.findByPk(id);
  return guide;
}

export async function deleteRecordGuide(id: number) {
  const guide = await Guide.findByPk(id);
  if (guide) {
    const cityGuides = await CityGuide.findAll({
      where: {
        GuideId: id,
      },
    });
    for (const cityGuide of cityGuides) {
      await CityGuide.destroy({
        where: { id: cityGuide.dataValues.id },
      });
    }
    await Guide.destroy({
      where: {
        id,
      },
    });
    return true;
  }
  logger.error(`Guide with this ID: ${id} was not found`);
  throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.GUIDE_NOT_FOUND);
}

export async function deleteRecordTag(id: number) {
  const tag = await Tag.findByPk(id);
  if (tag) {
    const sightTags = await SightTag.findAll({
      where: {
        TagId: id,
      },
    });
    for (const sightTag of sightTags) {
      await SightTag.destroy({
        where: { id: sightTag.dataValues.id },
      });
    }
    await Tag.destroy({
      where: {
        id,
      },
    });
    return true;
  }
  logger.error(`Tag with this ID: ${id} was not found`);
  throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.TAG_NOT_FOUND);
}

export async function createRecordSight(params: ICreateRecordSight) {
  const { image, name, description, price, distance, tagIds } = params;
  const loadImage = await uploadImage(image);
  const findTags = await Tag.findAll({
    where: {
      id: tagIds.map(Number),
    },
  });
  if (findTags.length !== tagIds.length) {
    logger.error("Tags were not found");
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.TAG_NOT_FOUND);
  }
  const sight = await Sight.create({
    name,
    image: loadImage,
    description,
    price,
    distance,
  });
  for (const tagId of tagIds) {
    await SightTag.create({
      SightId: sight.dataValues.id,
      TagId: Number(tagId),
    });
  }
  return sight;
}

export async function updateRecordSight(params: IUpdateRecordSight) {
  const { id, image, name, description, price, distance, tagIds } = params;
  const findSight = await Sight.findByPk(id);
  if (!findSight) {
    logger.error(`Sight with this ID: ${id} was not found`);
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.SIGHT_NOT_FOUND);
  }
  if (image) {
    const loadImage = await uploadImage(image);
    await Sight.update({ image: loadImage }, { where: { id } });
  }
  await Sight.update({ distance, price, description, name }, { where: { id } });
  if (tagIds.length !== 0) {
    const findTags = await Tag.findAll({
      where: {
        id: tagIds.map(Number),
      },
    });
    if (findTags.length !== tagIds.length) {
      logger.error("Tags were not found");
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.TAG_NOT_FOUND);
    }
    for (const tagId of tagIds) {
      await SightTag.findOrCreate({
        where: {
          TagId: Number(tagId),
          SightId: id,
        },
      });
    }
  }
  const sight = await Sight.findByPk(id);
  return sight;
}

export async function deleteRecordSight(id: number) {
  const sight = await Sight.findByPk(id);
  if (sight) {
    const sightTags = await SightTag.findAll({
      where: {
        SightId: id,
      },
    });
    for (const sightTag of sightTags) {
      await SightTag.destroy({
        where: { id: sightTag.dataValues.id },
      });
    }
    await Sight.destroy({
      where: {
        id,
      },
    });
    return true;
  }
  throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.SIGHT_NOT_FOUND);
}

export async function createRecordCity(params: ICreateRecordCity) {
  const { image, country, name, lat, lon, sightIds, guideIds } = params;
  const loadImage = await uploadImage(image);
  const city = await City.create({
    country,
    name,
    lat,
    lon,
    image: loadImage,
  });
  const findSights = await Sight.findAll({
    where: {
      id: sightIds.map(Number),
    },
  });
  if (findSights.length !== sightIds.length) {
    logger.error("Sigths were not found");
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.SIGHT_NOT_FOUND);
  }
  await Sight.update(
    { CityId: city.dataValues.id },
    { where: { id: sightIds.map(Number) } },
  );
  const findGuides = await Guide.findAll({
    where: {
      id: guideIds.map(Number),
    },
  });
  if (findGuides.length !== guideIds.length) {
    logger.error("Guides were not found");
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.GUIDE_NOT_FOUND);
  }
  for (const guideId of guideIds) {
    await CityGuide.create({
      CityId: city.dataValues.id,
      GuideId: Number(guideId),
    });
  }
  return city;
}

export async function updateRecordCity(params: IUpdateRecordCity) {
  const { id, image, country, name, lat, lon, sightIds, guideIds } = params;
  const findCity = await City.findByPk(id);
  if (!findCity) {
    logger.error(`City with this ID: ${id} was not found`);
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.CITY_NOT_FOUND);
  }
  if (image) {
    const loadImage = await uploadImage(image);
    await City.update({ image: loadImage }, { where: { id } });
  }
  await City.update({ country, name, lat, lon }, { where: { id } });
  if (sightIds.length !== 0) {
    const findSights = await Sight.findAll({
      where: {
        id: sightIds.map(Number),
      },
    });
    if (findSights.length !== sightIds.length) {
      logger.error(`Sights were not found`);
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.SIGHT_NOT_FOUND,
      );
    }
    await Sight.update({ CityId: id }, { where: { id: sightIds.map(Number) } });
  }
  if (guideIds.length !== 0) {
    const findGuides = await Guide.findAll({
      where: {
        id: guideIds.map(Number),
      },
    });
    if (findGuides.length !== guideIds.length) {
      logger.error(`Guides were not found`);
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.GUIDE_NOT_FOUND,
      );
    }
    for (const guideId of guideIds) {
      await CityGuide.findOrCreate({
        where: {
          CityId: id,
          GuideId: Number(guideId),
        },
      });
    }
  }
  const city = await City.findOne({
    where: { id },
    include: [
      {
        model: Sight,
        as: "sights",
        include: [
          {
            model: Tag,
            as: "tags",
          },
        ],
      },
      {
        model: Guide,
        as: "guides",
      },
    ],
  });
  return city;
}

export async function deleteRecordCity(id: number) {
  const city = await City.findByPk(id);
  if (city) {
    const sights = await Sight.findAll({
      where: {
        CityId: id,
      },
    });
    for (const sight of sights) {
      await Sight.update(
        { CityId: null },
        { where: { id: sight.dataValues.id } },
      );
    }
    const cityGuides = await CityGuide.findAll({
      where: {
        CityId: id,
      },
    });
    for (const cityGuide of cityGuides) {
      await CityGuide.destroy({
        where: { id: cityGuide.dataValues.id },
      });
    }
    await City.destroy({
      where: {
        id,
      },
    });
    return true;
  }
  throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.CITY_NOT_FOUND);
}

export async function createRecordRecommend(id: number) {
  const city = await City.findByPk(id);
  if (city) {
    const recommend = await Recommend.create({ CityId: id });
    return recommend;
  }
  logger.error(`City with this ID: ${id} was not found`);
  throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.CITY_NOT_FOUND);
}

export async function deleteRecordRecommend(id: number) {
  const findRecommend = await Recommend.findByPk(id);
  if (findRecommend) {
    await Recommend.destroy({
      where: {
        id,
      },
    });
    return true;
  }
  logger.error(`Recommendation with this ID: ${id} was not found`);
  throw new ApiError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    ERROR.RECOMMEND_NOT_FOUND,
  );
}
