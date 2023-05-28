import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { mergeCityFields } from "../libs/utils";
import ApiError from "../error/apiError";
import findRecommends from "../services/recommendsServices";

class RecommendsControllers {
  async getRecommends(req: Request, res: Response, next: NextFunction) {
    try {
      const recommends = await findRecommends();
      const result = mergeCityFields(recommends);
      return res.json(result);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new RecommendsControllers();
