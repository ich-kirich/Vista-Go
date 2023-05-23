import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import Tag from "../../models/tag";
import ApiError from "../error/apiError";
import { CODE_SEND, ERROR, RECORD_DELETED } from "../libs/constants";
import {
  createGuide,
  deleteRecordGuide,
  deleteRecordTag,
  updateGuide,
} from "../services/adminServices";

class AdminControllers {
  async createCity(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(CODE_SEND);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async updateCity(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json("resultLogin");
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async deleteCity(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json("updateName");
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async createSight(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json("resUpdate");
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async updateSight(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(CODE_SEND);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async deleteSight(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json("updatePassword");
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const tag = await Tag.create({ name });
      return res.json(tag);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
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
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async deleteTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const tryDeleteTag = await deleteRecordTag(id);
      if (tryDeleteTag instanceof ApiError) {
        return next(tryDeleteTag);
      }
      return res.json(RECORD_DELETED);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async createGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { image } = req.files;
      const guide = await createGuide(image as UploadedFile, name);
      if (guide instanceof ApiError) {
        return next(guide);
      }
      return res.json(guide);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async updateGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name } = req.body;
      const { image } = req.files || {};
      const guide = await updateGuide(id, name, image as UploadedFile);
      if (guide instanceof ApiError) {
        return next(guide);
      }
      return res.json(guide);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async deleteGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const tryDeleteGuide = await deleteRecordGuide(id);
      if (tryDeleteGuide instanceof ApiError) {
        return next(tryDeleteGuide);
      }
      return res.json(RECORD_DELETED);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }
}

export default new AdminControllers();
