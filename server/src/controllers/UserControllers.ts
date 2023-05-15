import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { generateJwt } from "../libs/utils";
import ApiError from "../error/apiError";
import {
  createUser,
  loginUser,
  validateLogin,
  validationRegistration,
} from "../services/userServices";

class UserControllers {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const checkInput = await validationRegistration(email, password, name);
      if (checkInput instanceof ApiError) {
        return next(checkInput);
      }
      const resultCreate = await createUser(name, email, password);
      return res.json(resultCreate);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const checkLogin = await validateLogin(email, password);
      if (checkLogin instanceof ApiError) {
        return next(checkLogin);
      }
      const resultLogin = await loginUser(
        checkLogin.id,
        email,
        checkLogin.name,
        checkLogin.image,
      );
      return res.json(resultLogin);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }
}

export default new UserControllers();
