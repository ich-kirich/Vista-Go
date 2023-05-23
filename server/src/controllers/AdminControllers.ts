import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";
import { CODE_SEND, RECORD_DELETED } from "../libs/constants";
import {
  createGuide,
  deleteRecord,
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
      return res.json("resultCreate");
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async updateTag(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json("resultCreate");
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async deleteTag(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json("resultCreate");
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async createGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { image } = req.files;
      const guide = await createGuide(image as UploadedFile, name);
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
      const tryDeleteGuide = await deleteRecord(id);
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
