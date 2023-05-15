import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";
import {
  createUser,
  loginUser,
  updateNameUser,
  validateLogin,
  validateName,
  validationRegistration,
} from "../services/userServices";
import User from "../../models/user";
import { ERROR } from "../libs/constants";

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

  async updateUserName(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name } = req.body;
      const checkName = validateName(name);
      if (checkName instanceof ApiError) {
        return next(checkName);
      }
      const updateName = await updateNameUser(id, name);
      return res.json(updateName);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }
}

export default new UserControllers();
