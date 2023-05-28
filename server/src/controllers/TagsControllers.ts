import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Tag from "../../models/tag";
import ApiError from "../error/apiError";

class TagsControllers {
  async getTags(req: Request, res: Response, next: NextFunction) {
    try {
      const tags = await Tag.findAll();
      return res.json(tags);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new TagsControllers();
