import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Sequelize } from "sequelize";
import Tag from "../../models/tag";
import Sight from "../../models/sight";
import ApiError from "../error/apiError";
import { findCitySights, findSight } from "../services/sightsServices";
import logger from "../libs/logger";

class SightsControllers {
  async getCitySights(req: Request, res: Response, next: NextFunction) {
    try {
      const cityId = req.params.id;
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
      const sightId = req.params.id;
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

  async getCount(req: Request, res: Response, next: NextFunction) {
    try {
      const { CityId } = req.body;
      const signt = await Sight.count({
        where: {
          CityId,
        },
      });
      logger.info("Sight fetched successfully");
      return res.json(signt);
    } catch (e) {
      logger.error("Error occurred while fetching all sights:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async getDiffTime(req: Request, res: Response, next: NextFunction) {
    try {
      const sight = await Sight.findOne({
        attributes: [
          "id",
          "name",
          "image",
          "description",
          "price",
          "distance",
          [Sequelize.literal("TIMEDIFF(updatedAt, createdAt)"), "timeDiff"],
        ],
      });
      logger.info("Sight fetched successfully");
      return res.json(sight);
    } catch (e) {
      logger.error("Error occurred while fetching all sights:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new SightsControllers();
