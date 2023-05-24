import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import { UploadedFile } from "express-fileupload";
import { uploadImageToApi } from "../libs/utils";
import ApiError from "../error/apiError";
import { ERROR } from "../libs/constants";
import Guide from "../../models/guide";
import { validateFile } from "./userServices";
import Tag from "../../models/tag";
import Sight from "../../models/sight";
import SightTag from "../../models/sightTag";
import City from "../../models/city";
import CityGuide from "../../models/cityGuide";

async function isGuideExsist(id: number) {
  const guide = await Guide.findByPk(id);

  if (guide) {
    return true;
  }
  return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.GUIDE_NOT_FOUND);
}

export async function createRecordGuide(image: UploadedFile, name: string) {
  const checkFile = await validateFile(image);
  if (checkFile instanceof ApiError) {
    return checkFile;
  }
  const fileName = `${uuidv4()}.${checkFile as string}`;
  const loadImage = await uploadImageToApi(image, fileName);
  if (loadImage instanceof ApiError) {
    return loadImage;
  }
  const guide = await Guide.create({ name, image: loadImage });
  return guide;
}

export async function updateRecordGuide(
  id: number,
  name: string,
  image: UploadedFile,
) {
  const findGuide = await isGuideExsist(id);
  if (findGuide instanceof ApiError) {
    return findGuide;
  }
  if (name) {
    await Guide.update({ name }, { where: { id } });
  }
  if (image) {
    const checkFile = await validateFile(image);
    if (checkFile instanceof ApiError) {
      return checkFile;
    }
    const fileName = `${uuidv4()}.${checkFile as string}`;
    const loadImage = await uploadImageToApi(image, fileName);
    if (loadImage instanceof ApiError) {
      return loadImage;
    }
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
  return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.GUIDE_NOT_FOUND);
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
  return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.TAG_NOT_FOUND);
}

export async function createRecordSight(
  image: UploadedFile,
  name: string,
  description: string,
  price: string,
  distance: string,
  tagIds: string[],
) {
  const checkFile = await validateFile(image);
  if (checkFile instanceof ApiError) {
    return checkFile;
  }
  const fileName = `${uuidv4()}.${checkFile as string}`;
  const loadImage = await uploadImageToApi(image, fileName);
  if (loadImage instanceof ApiError) {
    return loadImage;
  }
  const sight = await Sight.create({
    name,
    image: loadImage,
    description,
    price,
    distance,
  });
  for (const id of tagIds) {
    const findTag = await Tag.findByPk(id);
    if (!findTag) {
      return new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.TAG_NOT_FOUND,
      );
    }
    try {
      await SightTag.create({
        SightId: sight.dataValues.id,
        TagId: Number(id),
      });
    } catch (e) {
      return new ApiError(StatusCodes.BAD_REQUEST, e.message);
    }
  }
  return sight;
}

export async function updateRecordSight(
  id: number,
  cityId: number,
  image: UploadedFile,
  name: string,
  description: string,
  price: string,
  distance: string,
  tagIds: string[],
) {
  const findSight = await Sight.findByPk(id);
  if (!findSight) {
    return new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      ERROR.SIGHT_NOT_FOUND,
    );
  }
  if (name) {
    await Sight.update({ name }, { where: { id } });
  }
  if (image) {
    const checkFile = await validateFile(image);
    if (checkFile instanceof ApiError) {
      return checkFile;
    }
    const fileName = `${uuidv4()}.${checkFile as string}`;
    const loadImage = await uploadImageToApi(image, fileName);
    if (loadImage instanceof ApiError) {
      return loadImage;
    }
    await Sight.update({ image: loadImage }, { where: { id } });
  }
  if (description) {
    await Sight.update({ description }, { where: { id } });
  }
  if (price) {
    await Sight.update({ price }, { where: { id } });
  }
  if (distance) {
    await Sight.update({ distance }, { where: { id } });
  }
  if (cityId) {
    const findCity = await City.findByPk(cityId);
    if (!findCity) {
      return new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.CITY_NOT_FOUND,
      );
    }
    await Sight.update({ CityId: cityId }, { where: { id } });
  }
  if (tagIds) {
    for (const tagId of tagIds) {
      const findTag = await Tag.findByPk(tagId);
      if (!findTag) {
        return new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          ERROR.TAG_NOT_FOUND,
        );
      }
    }
    for (const tagId of tagIds) {
      await SightTag.update(
        { TagId: tagId },
        { where: { SightId: findSight.dataValues.id } },
      );
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
  return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.SIGHT_NOT_FOUND);
}

export async function createRecordCity(
  image: UploadedFile,
  country: string,
  name: string,
  lat: string,
  lon: string,
  sightIds: string[],
  guideIds: string[],
) {
  const checkFile = await validateFile(image);
  if (checkFile instanceof ApiError) {
    return checkFile;
  }
  const fileName = `${uuidv4()}.${checkFile as string}`;
  const loadImage = await uploadImageToApi(image, fileName);
  if (loadImage instanceof ApiError) {
    return loadImage;
  }
  const city = await City.create({
    country,
    name,
    lat,
    lon,
    image: loadImage,
  });
  for (const id of sightIds) {
    const findSight = await Sight.findByPk(Number(id));
    if (!findSight) {
      return new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.SIGHT_NOT_FOUND,
      );
    }
    try {
      await Sight.update(
        { CityId: city.dataValues.id },
        { where: { id: Number(id) } },
      );
    } catch (e) {
      return new ApiError(StatusCodes.BAD_REQUEST, e.message);
    }
  }
  for (const id of guideIds) {
    const findGuide = await Guide.findByPk(Number(id));
    if (!findGuide) {
      return new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.GUIDE_NOT_FOUND,
      );
    }
    try {
      await CityGuide.create({
        CityId: city.dataValues.id,
        GuideId: Number(id),
      });
    } catch (e) {
      return new ApiError(StatusCodes.BAD_REQUEST, e.message);
    }
  }
  return city;
}

export async function updateRecordCity(
  id: number,
  image: UploadedFile,
  country: string,
  name: string,
  lat: string,
  lon: string,
  sightIds: string[],
  guideIds: string[],
) {
  const findCity = await City.findByPk(id);
  if (!findCity) {
    return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.CITY_NOT_FOUND);
  }
  if (image) {
    const checkFile = await validateFile(image);
    if (checkFile instanceof ApiError) {
      return checkFile;
    }
    const fileName = `${uuidv4()}.${checkFile as string}`;
    const loadImage = await uploadImageToApi(image, fileName);
    if (loadImage instanceof ApiError) {
      return loadImage;
    }
    await City.update({ image: loadImage }, { where: { id } });
  }
  if (country) {
    await City.update({ country }, { where: { id } });
  }
  if (name) {
    await City.update({ name }, { where: { id } });
  }
  if (lat) {
    await City.update({ lat }, { where: { id } });
  }
  if (lon) {
    await City.update({ lon }, { where: { id } });
  }
  if (sightIds) {
    for (const sightId of sightIds) {
      const findSight = await Sight.findByPk(Number(sightId));
      if (!findSight) {
        return new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          ERROR.SIGHT_NOT_FOUND,
        );
      }
    }
    for (const sightId of sightIds) {
      await Sight.update({ CityId: id }, { where: { id: Number(sightId) } });
    }
  }
  if (guideIds) {
    for (const guideId of guideIds) {
      const findGuide = await Guide.findByPk(Number(guideId));
      if (!findGuide) {
        return new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          ERROR.GUIDE_NOT_FOUND,
        );
      }
    }
    for (const guideId of guideIds) {
      await CityGuide.update(
        { CityId: id },
        { where: { GuideId: Number(guideId) } },
      );
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
  return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.CITY_NOT_FOUND);
}
