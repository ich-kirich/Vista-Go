import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";
import { findGuides } from "../services/guidesServices";

class GuidesControllers {
  async getGuides(req: Request, res: Response, next: NextFunction) {
    try {
      const guides = await findGuides();
      return res.json(guides);
    } catch (e) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, e.message));
    }
  }
}

export default new GuidesControllers();
