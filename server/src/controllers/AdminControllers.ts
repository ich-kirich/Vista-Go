import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
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
      return res.json(recommend);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteRecommend(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteRecommend = await deleteRecordRecommend(Number(id));
      return res.json(RECORD_DELETED);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { country, name, lat, lon, sightIds, guideIds } = req.body;
      const { image } = req.files;
      const city = await createRecordCity({
        image: image as UploadedFile,
        country,
        name,
        lat,
        lon,
        sightIds,
        guideIds,
      });
      return res.json(city);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, country, name, lat, lon, sightIds, guideIds } = req.body;
      const { image } = req.files || {};
      const city = await updateRecordCity({
        id,
        image: image as UploadedFile,
        country,
        name,
        lat,
        lon,
        sightIds,
        guideIds,
      });
      return res.json(city);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteCity = await deleteRecordCity(Number(id));
      return res.json(RECORD_DELETED);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createSight(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, distance, tagIds } = req.body;
      const { image } = req.files;
      const sight = await createRecordSight({
        image: image as UploadedFile,
        name,
        description,
        price,
        distance,
        tagIds,
      });
      return res.json(sight);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateSight(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name, description, price, distance, tagIds } = req.body;
      const { image } = req.files || {};
      const sight = await updateRecordSight({
        id,
        image: image as UploadedFile,
        name,
        description,
        price,
        distance,
        tagIds,
      });
      return res.json(sight);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteSight(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteSight = await deleteRecordSight(Number(id));
      return res.json(RECORD_DELETED);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const tag = await Tag.create({ name });
      return res.json(tag);
    } catch (e) {
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
        return res.json(updatedTag);
      }
      return next(
        new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.TAG_NOT_FOUND),
      );
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteTag = await deleteRecordTag(Number(id));
      return res.json(RECORD_DELETED);
    } catch (e) {
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
      return res.json(guide);
    } catch (e) {
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
      return res.json(guide);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteGuide = await deleteRecordGuide(Number(id));
      return res.json(RECORD_DELETED);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new AdminControllers();
