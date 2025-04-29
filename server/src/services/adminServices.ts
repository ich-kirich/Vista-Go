import { StatusCodes } from "http-status-codes";
import { UploadedFile } from "express-fileupload";
import ApiError from "../error/apiError";
import { ERROR, ROLES } from "../libs/constants";
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
  ICreateRecordGuide,
  ICreateRecordSight,
  IUpdateRecordCity,
  IUpdateRecordSight,
} from "../types/types";
import logger from "../libs/logger";
import User from "../../models/user";
import sequelize from "../db";
import GuideSight from "../../models/GuideSight";

export async function createRecordGuide(params: ICreateRecordGuide) {
  const {
    image,
    name,
    userId,
    cityIds = [],
    sightIds = [],
    contacts,
    description,
  } = params;

  const transaction = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction });

    if (!user) {
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.USER_NOT_FOUND,
      );
    }

    if (user.dataValues.role === ROLES.GUIDE) {
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.USER_IS_ALREADY_GUIDE,
      );
    }

    const loadImage = await uploadImage(image);

    const guide = await Guide.create(
      {
        name,
        description,
        image: loadImage,
        contacts,
        userId: user.id,
      },
      { transaction },
    );

    await User.update(
      { role: ROLES.GUIDE },
      { where: { id: user.id }, transaction },
    );

    if (cityIds.length) {
      const cityGuideRecords = cityIds.map((cityId) => ({
        CityId: Number(cityId),
        GuideId: guide.id,
      }));
      await CityGuide.bulkCreate(cityGuideRecords, { transaction });
    }

    if (sightIds.length) {
      const guideSightRecords = sightIds.map((sightId) => ({
        GuideId: guide.id,
        SightId: Number(sightId),
      }));
      await GuideSight.bulkCreate(guideSightRecords, { transaction });
    }

    await transaction.commit();
    return guide;
  } catch (error) {
    await transaction.rollback();
    logger.error("Error during guide creation transaction", error);
    throw error;
  }
}

export async function updateRecordGuide(
  id: number,
  name?: object,
  image?: UploadedFile,
  description?: object,
  contacts?: string,
  cityIds: number[] = [],
  sightIds: number[] = [],
) {
  const transaction = await sequelize.transaction();

  try {
    const guide = await Guide.findByPk(id, { transaction });

    if (!guide) {
      logger.error(`Guide with ID: ${id} was not found`);
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.GUIDE_NOT_FOUND,
      );
    }

    const updateData: any = { name };

    if (description) {
      updateData.description = description;
    }

    if (contacts) {
      updateData.contacts = contacts;
    }

    if (image) {
      const loadImage = await uploadImage(image);
      updateData.image = loadImage;
    }

    await Guide.update(updateData, { where: { id }, transaction });

    if (cityIds !== undefined) {
      await CityGuide.destroy({ where: { GuideId: id }, transaction });

      if (cityIds.length > 0) {
        const cityGuideRecords = cityIds.map((cityId) => ({
          CityId: cityId,
          GuideId: id,
        }));
        await CityGuide.bulkCreate(cityGuideRecords, { transaction });
      }
    }

    if (sightIds !== undefined) {
      await GuideSight.destroy({ where: { GuideId: id }, transaction });

      if (sightIds.length > 0) {
        const guideSightRecords = sightIds.map((sightId) => ({
          GuideId: id,
          SightId: sightId,
        }));
        await GuideSight.bulkCreate(guideSightRecords, { transaction });
      }
    }

    await transaction.commit();

    const updatedGuide = await Guide.findByPk(id);
    return updatedGuide;
  } catch (error) {
    await transaction.rollback();
    logger.error("Error during guide update transaction", error);
    throw error;
  }
}

export async function deleteRecordGuide(id: number) {
  const transaction = await sequelize.transaction();

  try {
    const guide = await Guide.findByPk(id, { transaction });

    if (!guide) {
      logger.error(`Guide with ID: ${id} was not found`);
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.GUIDE_NOT_FOUND,
      );
    }

    const userId = guide.userId;

    if (userId) {
      await User.update(
        { role: "USER" },
        { where: { id: userId }, transaction },
      );
    }

    await CityGuide.destroy({
      where: { GuideId: id },
      transaction,
    });

    await GuideSight.destroy({
      where: { GuideId: id },
      transaction,
    });

    await Guide.destroy({
      where: { id },
      transaction,
    });

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    logger.error("Transaction failed during guide deletion", error);
    throw error;
  }
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
  const { image, name, description, tagIds = [], guideIds = [] } = params;

  const transaction = await sequelize.transaction();

  try {
    const loadImage = await uploadImage(image);

    const findTags = await Tag.findAll({
      where: { id: tagIds.map(Number) },
      transaction,
    });

    if (findTags.length !== tagIds.length) {
      logger.error("Some tags were not found");
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.TAG_NOT_FOUND);
    }

    if (guideIds.length) {
      const findGuides = await Guide.findAll({
        where: { id: guideIds.map(Number) },
        transaction,
      });

      if (findGuides.length !== guideIds.length) {
        logger.error("Some guides were not found");
        throw new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          ERROR.GUIDE_NOT_FOUND,
        );
      }
    }

    const sight = await Sight.create(
      {
        name,
        image: loadImage,
        description,
      },
      { transaction },
    );

    if (tagIds.length) {
      const sightTagsData = tagIds.map((tagId) => ({
        SightId: sight.id,
        TagId: Number(tagId),
      }));
      await SightTag.bulkCreate(sightTagsData, { transaction });
    }

    if (guideIds.length) {
      const guideSightData = guideIds.map((guideId) => ({
        GuideId: Number(guideId),
        SightId: sight.id,
      }));
      await GuideSight.bulkCreate(guideSightData, { transaction });
    }

    await transaction.commit();
    return sight;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function updateRecordSight(params: IUpdateRecordSight) {
  const { id, image, name, description, tagIds = [], guideIds = [] } = params;

  const transaction = await sequelize.transaction();

  try {
    const findSight = await Sight.findByPk(id, { transaction });

    if (!findSight) {
      logger.error(`Sight with ID: ${id} was not found`);
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.SIGHT_NOT_FOUND,
      );
    }

    const updateData: any = { description, name };

    if (image) {
      const loadImage = await uploadImage(image);
      updateData.image = loadImage;
    }

    await Sight.update(updateData, { where: { id }, transaction });

    if (tagIds !== undefined) {
      await SightTag.destroy({ where: { SightId: id }, transaction });

      if (tagIds.length > 0) {
        const findTags = await Tag.findAll({
          where: { id: tagIds.map(Number) },
          transaction,
        });

        if (findTags.length !== tagIds.length) {
          logger.error("Some tags were not found");
          throw new ApiError(
            StatusCodes.UNPROCESSABLE_ENTITY,
            ERROR.TAG_NOT_FOUND,
          );
        }

        const sightTagsData = tagIds.map((tagId) => ({
          SightId: id,
          TagId: Number(tagId),
        }));

        await SightTag.bulkCreate(sightTagsData, { transaction });
      }
    }

    if (guideIds !== undefined) {
      await GuideSight.destroy({ where: { SightId: id }, transaction });

      if (guideIds.length > 0) {
        const findGuides = await Guide.findAll({
          where: { id: guideIds.map(Number) },
          transaction,
        });

        if (findGuides.length !== guideIds.length) {
          logger.error("Some guides were not found");
          throw new ApiError(
            StatusCodes.UNPROCESSABLE_ENTITY,
            ERROR.GUIDE_NOT_FOUND,
          );
        }

        const guideSightData = guideIds.map((guideId) => ({
          GuideId: Number(guideId),
          SightId: id,
        }));

        await GuideSight.bulkCreate(guideSightData, { transaction });
      }
    }

    await transaction.commit();

    const updatedSight = await Sight.findByPk(id, {
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
              required: false,
            },
          ],
        },
      ],
    });

    return updatedSight;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function deleteRecordSight(id: number) {
  const transaction = await sequelize.transaction();

  try {
    const sight = await Sight.findByPk(id, { transaction });

    if (!sight) {
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.SIGHT_NOT_FOUND,
      );
    }

    await SightTag.destroy({
      where: { SightId: id },
      transaction,
    });

    await GuideSight.destroy({
      where: { SightId: id },
      transaction,
    });

    await Sight.destroy({
      where: { id },
      transaction,
    });

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    logger.error("Transaction failed during sight deletion", error);
    throw error;
  }
}

export async function createRecordCity(params: ICreateRecordCity) {
  const {
    image,
    country,
    name,
    lat,
    lon,
    sightIds = [],
    guideIds = [],
  } = params;

  const loadImage = await uploadImage(image);

  const city = await City.create({
    country,
    name,
    lat,
    lon,
    image: loadImage,
  });

  if (sightIds.length) {
    const findSights = await Sight.findAll({
      where: { id: sightIds.map(Number) },
    });

    if (findSights.length !== sightIds.length) {
      logger.error("Some sights were not found");
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.SIGHT_NOT_FOUND,
      );
    }

    await Sight.update(
      { CityId: city.id },
      { where: { id: sightIds.map(Number) } },
    );
  }

  if (guideIds.length) {
    const findGuides = await Guide.findAll({
      where: { id: guideIds.map(Number) },
    });

    if (findGuides.length !== guideIds.length) {
      logger.error("Some guides were not found");
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.GUIDE_NOT_FOUND,
      );
    }

    const cityGuideRecords = guideIds.map((guideId) => ({
      CityId: city.id,
      GuideId: Number(guideId),
    }));

    await CityGuide.bulkCreate(cityGuideRecords);
  }

  return city;
}

export async function updateRecordCity(params: IUpdateRecordCity) {
  const {
    id,
    image,
    country,
    name,
    lat,
    lon,
    sightIds = [],
    guideIds = [],
  } = params;

  const findCity = await City.findByPk(id);
  if (!findCity) {
    logger.error(`City with ID ${id} was not found`);
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.CITY_NOT_FOUND);
  }

  const updateData: any = { country, name, lat, lon };

  if (image) {
    const loadImage = await uploadImage(image);
    updateData.image = loadImage;
  }

  await City.update(updateData, { where: { id } });

  if (sightIds !== undefined) {
    await Sight.update({ CityId: null }, { where: { CityId: id } });

    if (sightIds.length > 0) {
      const findSights = await Sight.findAll({
        where: { id: sightIds.map(Number) },
      });

      if (findSights.length !== sightIds.length) {
        logger.error(`Some sights were not found`);
        throw new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          ERROR.SIGHT_NOT_FOUND,
        );
      }

      await Sight.update(
        { CityId: id },
        { where: { id: sightIds.map(Number) } },
      );
    }
  }

  if (guideIds !== undefined) {
    await CityGuide.destroy({ where: { CityId: id } });

    if (guideIds.length > 0) {
      const findGuides = await Guide.findAll({
        where: { id: guideIds.map(Number) },
      });

      if (findGuides.length !== guideIds.length) {
        logger.error(`Some guides were not found`);
        throw new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          ERROR.GUIDE_NOT_FOUND,
        );
      }

      const cityGuideRecords = guideIds.map((guideId) => ({
        CityId: id,
        GuideId: Number(guideId),
      }));

      await CityGuide.bulkCreate(cityGuideRecords);
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
        include: [
          {
            model: User,
            as: "user",
            where: { isBanned: false },
            attributes: [],
            required: false,
          },
        ],
      },
    ],
  });

  return city;
}

export async function deleteRecordCity(id: number) {
  const transaction = await sequelize.transaction();

  try {
    const city = await City.findByPk(id, { transaction });
    if (!city) {
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        ERROR.CITY_NOT_FOUND,
      );
    }

    await Sight.update(
      { CityId: null },
      { where: { CityId: id }, transaction },
    );

    await CityGuide.destroy({
      where: { CityId: id },
      transaction,
    });

    await Recommend.destroy({
      where: { CityId: id },
      transaction,
    });

    await City.destroy({
      where: { id },
      transaction,
    });

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function createRecordRecommend(id: number) {
  const city = await City.findByPk(id);
  const findRecommend = await Recommend.findOne({ where: { CityId: id } });
  if (!city) {
    logger.error(`City with this ID: ${id} was not found`);
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.CITY_NOT_FOUND);
  }
  if (findRecommend) {
    logger.error(`Recommend with this ID: ${id} was found`);
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.RECOMMEND_FOUND);
  }
  const recommend = await Recommend.create({ CityId: id });
  return recommend;
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
