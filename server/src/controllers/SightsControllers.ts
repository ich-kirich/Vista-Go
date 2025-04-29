import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Tag from "../../models/tag";
import Sight from "../../models/sight";
import ApiError from "../error/apiError";
import { findCitySights, findSight } from "../services/sightsServices";
import logger from "../libs/logger";
import Guide from "../../models/guide";
import User from "../../models/user";

class SightsControllers {
  async getCitySights(req: Request, res: Response, next: NextFunction) {
    try {
      const cityId = req.params.cityId;
      const sights = await findCitySights(cityId);
      logger.info(`Sights of city with this ID${cityId} fetched successfully`);
      return res.json(sights);
    } catch (e) {
      logger.error("Error occurred while fetching city sights:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async getSight(req: Request, res: Response, next: NextFunction) {
    try {
      const sightId = req.params.sightId;
      const sight = await findSight(sightId);
      logger.info(`Sight with this ID ${sightId} fetched successfully`);
      return res.json(sight);
    } catch (e) {
      logger.error("Error occurred while fetching sight:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async getAllSights(req: Request, res: Response, next: NextFunction) {
    try {
      const sights = await Sight.findAll({
        include: [
          {
            model: Tag,
            as: "tags",
          },
          {
            model: Guide,
            as: "guides",
            include: [
              {
                model: User,
                as: "user",
                where: { isBanned: false },
                attributes: [],
              },
            ],
          },
        ],
      });
      logger.info("All sights fetched successfully");
      return res.json(sights);
    } catch (e) {
      logger.error("Error occurred while fetching all sights:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new SightsControllers();
