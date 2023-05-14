import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { generateJwt } from "../libs/utils";
import ApiError from "../error/apiError";
import { createUser, loginUser } from "../services/userServices";

class UserControllers {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const resultCreate = await createUser(name, email, password);
      return res.json(resultCreate);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const resultLogin = await loginUser(email, password);
      return res.json(resultLogin);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }

  async checkAuth(req: Request, res: Response, next: NextFunction) {
    const jwtToken = generateJwt(req.user.id, req.user.email, req.user.name);
    return res.json({ jwtToken });
  }
}

export default new UserControllers();
