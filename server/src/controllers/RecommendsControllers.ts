import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { mergeCityFields } from "../libs/utils";
import ApiError from "../error/apiError";
import findRecommends from "../services/recommendsServices";
import logger from "../libs/logger";

class RecommendsControllers {
  async getRecommends(req: Request, res: Response, next: NextFunction) {
    try {
      const recommends = await findRecommends();
      const result = mergeCityFields(recommends);
      logger.info("Recommends fetched successfully");
      return res.json(result);
    } catch (e) {
      logger.error("Error occurred while fetching recommends:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new RecommendsControllers();
