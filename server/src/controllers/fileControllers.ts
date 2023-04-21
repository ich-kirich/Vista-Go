import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../libs/constants";
import ApiError from "../error/apiError";

class FileControllers {
  async getInf(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await db.getData("/cities");
      return res.json(cities);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async getRec(req: Request, res: Response, next: NextFunction) {
    try {
      const recommends = await db.getData("/cities");
      return res.json(recommends);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }
}

export default new FileControllers();
