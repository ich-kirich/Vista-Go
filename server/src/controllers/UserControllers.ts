import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";
import { findCity } from "../services/citiesServices";
import { createUser, validationRegistration } from "../services/userServices";

class UserControllers {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const checkInput = await validationRegistration(email, password, name);
      if (checkInput instanceof ApiError) {
        return next(checkInput);
      }
      const newUser = await createUser(name, email, password);
      return res.json(newUser);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const cityId = req.params.id;
      const city = await findCity(cityId);
      return res.json(city);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async checkAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const cityId = req.params.id;
      const city = await findCity(cityId);
      return res.json(city);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }
}

export default new UserControllers();
