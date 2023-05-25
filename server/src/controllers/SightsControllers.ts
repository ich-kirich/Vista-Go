import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Tag from "../../models/tag";
import Sight from "../../models/sight";
import ApiError from "../error/apiError";
import { findCitySights, findSight } from "../services/sightsServices";

class SightsControllers {
  async getCitySights(req: Request, res: Response, next: NextFunction) {
    try {
      const cityId = req.params.id;
      const sights = await findCitySights(cityId);
      return res.json(sights);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async getSight(req: Request, res: Response, next: NextFunction) {
    try {
      const sightId = req.params.id;
      const sight = await findSight(sightId);
      return res.json(sight);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
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
      return res.json(sights);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }
}

export default new SightsControllers();
