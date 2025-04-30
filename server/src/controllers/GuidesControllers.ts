import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../libs/logger";
import ApiError from "../error/apiError";
import { findGuides } from "../services/guidesServices";
import Guide from "../../models/guide";
import City from "../../models/city";
import Sight from "../../models/sight";
import { ERROR } from "../libs/constants";

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

  async getGuideById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const guide = await Guide.findByPk(id, {
        include: [
          {
            model: City,
            as: "cities",
          },
          {
            model: Sight,
            as: "sights",
          },
        ],
      });

      if (!guide) {
        logger.error(`Guide with ID: ${id} not found`);
        return next(new ApiError(StatusCodes.NOT_FOUND, ERROR.GUIDE_NOT_FOUND));
      }

      logger.info(`Guide with ID: ${id} fetched successfully`);

      return res.json(guide);
    } catch (e) {
      logger.error("Error occurred while fetching the guide:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new GuidesControllers();
