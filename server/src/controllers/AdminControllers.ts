import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import logger from "../libs/logger";
import Tag from "../../models/tag";
import ApiError from "../error/apiError";
import { ERROR, RECORD_DELETED } from "../libs/constants";
import {
  createRecordCity,
  createRecordGuide,
  createRecordRecommend,
  createRecordSight,
  deleteRecordCity,
  deleteRecordGuide,
  deleteRecordRecommend,
  deleteRecordSight,
  deleteRecordTag,
  updateRecordCity,
  updateRecordGuide,
  updateRecordSight,
} from "../services/adminServices";

class AdminControllers {
  async createRecommend(req: Request, res: Response, next: NextFunction) {
    try {
      const { cityId } = req.body;
      const recommend = await createRecordRecommend(cityId);
      logger.info("Recommendation was successfully created", recommend);
      return res.json(recommend);
    } catch (e) {
      logger.error("Error during creating a recommendation", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteRecommend(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteRecommend = await deleteRecordRecommend(Number(id));
      logger.info(
        `Recommendation with this ID: ${id} has been successfully deleted`,
      );
      return res.json(RECORD_DELETED);
    } catch (e) {
      logger.error("Error during deleting a recommendation", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { country, name, lat, lon, sightIds, guideIds } = req.body;
      const { image } = req.files;
      const sightIdsArr = sightIds ? JSON.parse(sightIds) : [];
      const guideIdsArr = guideIds ? JSON.parse(guideIds) : [];
      const city = await createRecordCity({
        image: image as UploadedFile,
        country,
        name,
        lat,
        lon,
        sightIds: sightIdsArr,
        guideIds: guideIdsArr,
      });
      logger.info("City was successfully created", city);
      return res.json(city);
    } catch (e) {
      logger.error("Error during creating a city", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, country, name, lat, lon, sightIds, guideIds } = req.body;
      const { image } = req.files || {};
      const sightIdsArr = sightIds ? JSON.parse(sightIds) : [];
      const guideIdsArr = guideIds ? JSON.parse(guideIds) : [];
      const city = await updateRecordCity({
        id,
        image: image as UploadedFile,
        country,
        name,
        lat,
        lon,
        sightIds: sightIdsArr,
        guideIds: guideIdsArr,
      });
      logger.info("City was successfully updated", city);
      return res.json(city);
    } catch (e) {
      logger.error("Error during updating a city", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteCity = await deleteRecordCity(Number(id));
      logger.info(`City with this ID: ${id} has been successfully deleted`);
      return res.json(RECORD_DELETED);
    } catch (e) {
      logger.error("Error during deleting a city", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createSight(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, distance, tagIds } = req.body;
      const { image } = req.files;
      const tagIdsArr = tagIds ? JSON.parse(tagIds) : [];
      const sight = await createRecordSight({
        image: image as UploadedFile,
        name,
        description,
        price,
        distance,
        tagIds: tagIdsArr,
      });
      logger.info("Sight was successfully created", sight);
      return res.json(sight);
    } catch (e) {
      logger.error("Error during creating a sight", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateSight(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name, description, price, distance, tagIds } = req.body;
      const { image } = req.files || {};
      const tagIdsArr = tagIds ? JSON.parse(tagIds) : [];
      const sight = await updateRecordSight({
        id,
        image: image as UploadedFile,
        name,
        description,
        price,
        distance,
        tagIds: tagIdsArr,
      });
      logger.info("Sight was successfully updated", sight);
      return res.json(sight);
    } catch (e) {
      logger.error("Error during updating a sight", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteSight(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteSight = await deleteRecordSight(Number(id));
      logger.info(`Sight with this ID: ${id} has been successfully deleted`);
      return res.json(RECORD_DELETED);
    } catch (e) {
      logger.error("Error during deleting a sight", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const tag = await Tag.create({ name });
      logger.info("Tag was successfully created", tag);
      return res.json(tag);
    } catch (e) {
      logger.error("Error during creating a tag", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name } = req.body;
      const tag = await Tag.findByPk(id);
      if (tag) {
        await Tag.update({ name }, { where: { id } });
        const updatedTag = await Tag.findByPk(id);
        logger.info("Tag was successfully updated", tag);
        return res.json(updatedTag);
      }
      logger.error(`Tag with this ID: ${id} was not found`);
      return next(
        new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.TAG_NOT_FOUND),
      );
    } catch (e) {
      logger.error("Error during updating a tag", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteTag = await deleteRecordTag(Number(id));
      logger.info(`Tag with this ID: ${id} has been successfully deleted`);
      return res.json(RECORD_DELETED);
    } catch (e) {
      logger.error("Error during deleting a tag", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { image } = req.files;
      const guide = await createRecordGuide(image as UploadedFile, name);
      logger.info("Guide was successfully created", guide);
      return res.json(guide);
    } catch (e) {
      logger.error("Error during creating a guide", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name } = req.body;
      const { image } = req.files || {};
      const guide = await updateRecordGuide(id, name, image as UploadedFile);
      logger.info("Guide was successfully updated", guide);
      return res.json(guide);
    } catch (e) {
      logger.error("Error during updating a guide", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteGuide = await deleteRecordGuide(Number(id));
      logger.info(`Guide with this ID: ${id} has been successfully deleted`);
      return res.json(RECORD_DELETED);
    } catch (e) {
      logger.error("Error during deleting a guide", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new AdminControllers();
