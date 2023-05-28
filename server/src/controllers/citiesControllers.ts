import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";
import { findCities, findCity } from "../services/citiesServices";

class CitiesControllers {
  async getCities(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await findCities();
      return res.json(cities);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async getCity(req: Request, res: Response, next: NextFunction) {
    try {
      const cityId = req.params.id;
      const city = await findCity(cityId);
      return res.json(city);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new CitiesControllers();
