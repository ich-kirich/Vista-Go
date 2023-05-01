import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";
import {
  findRecommends,
  findCities,
  findCity,
  findRecommend,
} from "../services/citiesServices";

class CitiesControllers {
  async getCities(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await findCities();
      return res.json(cities);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async getCity(req: Request, res: Response, next: NextFunction) {
    try {
      const cityId = req.params.id;
      const city = await findCity(cityId);
      return res.json(city);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async getRecommend(req: Request, res: Response, next: NextFunction) {
    try {
      const recommendId = req.params.id;
      const recommend = await findRecommend(recommendId);
      return res.json(recommend);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async getRecommends(req: Request, res: Response, next: NextFunction) {
    try {
      const recommends = await findRecommends();
      return res.json(recommends);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }
}

export default new CitiesControllers();
