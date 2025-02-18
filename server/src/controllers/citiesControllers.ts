import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Sequelize } from "sequelize";
import logger from "../libs/logger";
import ApiError from "../error/apiError";
import City from "../../models/city";
import { findCities, findCity } from "../services/citiesServices";

class CitiesControllers {
  async getCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const city = await findCity(id);
      logger.info("City fetched successfully");
      return res.json(city);
    } catch (e) {
      logger.error("Error occurred while fetching cities:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async getCount(req: Request, res: Response, next: NextFunction) {
    try {
      const { country } = req.body;
      const city = await City.count({
        where: {
          country,
        },
      });
      logger.info("City fetched successfully");
      return res.json(city);
    } catch (e) {
      logger.error("Error occurred while fetching cities:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async getCoord(req: Request, res: Response, next: NextFunction) {
    try {
      const city = await City.findAll({
        attributes: [
          "id",
          "name",
          "image",
          "weather",
          "country",
          "lat",
          "lon",
          [Sequelize.literal("CONCAT(lat, ', ', lon)"), "location"],
        ],
      });
      logger.info("Cities fetched successfully");
      return res.json(city);
    } catch (e) {
      logger.error("Error occurred while fetching cities:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async getCities(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await findCities();
      logger.info("Cities fetched successfully");
      return res.json(cities);
    } catch (e) {
      logger.error("Error occurred while fetching cities:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new CitiesControllers();
