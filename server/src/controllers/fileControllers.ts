import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";
import generateDb from "../services/fileServices";

class FileControllers {
  async getInf(req: Request, res: Response, next: NextFunction) {
    try {
      const db = await generateDb();
      const cities = await db.getData("/cities");
      return res.json(cities);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }
}

export default new FileControllers();
