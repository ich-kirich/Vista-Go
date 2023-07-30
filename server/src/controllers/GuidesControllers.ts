import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../libs/logger";
import ApiError from "../error/apiError";
import { findGuides } from "../services/guidesServices";

class GuidesControllers {
  async getGuides(req: Request, res: Response, next: NextFunction) {
    try {
      const guides = await findGuides();
      logger.info("Guides fetched successfully");
      return res.json(guides);
    } catch (e) {
      logger.error("Error occurred while fetching guides:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new GuidesControllers();
