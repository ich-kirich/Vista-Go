import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../libs/logger";
import ApiError from "../error/apiError";
import { findGuides } from "../services/guidesServices";
import Guide from "../../models/guide";
import City from "../../models/city";
import Sight from "../../models/sight";
import { ERROR } from "../libs/constants";
import User from "../../models/user";

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

      const user = await User.findOne({
        where: { id: guide.dataValues.userId },
      });
      if (!user) {
        logger.error(
          `User with this id: ${guide.dataValues.userId} was not found`,
        );
        throw new ApiError(StatusCodes.NOT_FOUND, ERROR.USER_NOT_FOUND);
      }
      if (user.isBanned) {
        logger.error(`User with this id: ${guide.dataValues.userId} is banned`);
        throw new ApiError(StatusCodes.FORBIDDEN, ERROR.USER_IS_BANNED);
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
