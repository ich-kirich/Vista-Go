import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "config";
import { ERROR } from "../libs/constants";
import ApiError from "../error/apiError";

function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const jwtToken = req.headers.authorization.split(" ")[1];
    if (!jwtToken) {
      next(new ApiError(StatusCodes.UNAUTHORIZED, ERROR.UNAUTHORIZED_USER));
    }
    const decoded = jwt.verify(jwtToken, config.get("jwt.secretKey"));
    req.user = decoded;
    next();
  } catch (e) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, ERROR.UNAUTHORIZED_USER));
  }
}

export default AuthMiddleware;
