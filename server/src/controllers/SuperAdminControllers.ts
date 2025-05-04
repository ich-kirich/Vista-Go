import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../libs/logger";
import User from "../../models/user";
import ApiError from "../error/apiError";
import { ERROR, ROLES } from "../libs/constants";

class SuperAdminControllers {
  async upgradeToAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        logger.error(`User with ID: ${id} not found`);
        return next(new ApiError(StatusCodes.NOT_FOUND, ERROR.USER_NOT_FOUND));
      }

      if (user.dataValues.role === ROLES.GUIDE) {
        logger.error(`User with ID: ${id} is guide`);
        return next(
          new ApiError(
            StatusCodes.UNPROCESSABLE_ENTITY,
            ERROR.USER_IS_ALREADY_GUIDE,
          ),
        );
      }

      if (user.dataValues.role === ROLES.ADMIN) {
        logger.error(`User with ID: ${id} is admin`);
        return next(
          new ApiError(
            StatusCodes.UNPROCESSABLE_ENTITY,
            ERROR.USER_IS_ALREADY_ADMIN,
          ),
        );
      }

      user.role = ROLES.ADMIN;
      await user.save();

      logger.info(`The user with ID: ${id} become Admin`);
      return res.json({
        message: "The user has become an admin",
      });
    } catch (e) {
      logger.error("Error when upgrading to admin", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async downgradeAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        logger.error(`User with ID: ${id} not found`);
        return next(new ApiError(StatusCodes.NOT_FOUND, ERROR.USER_NOT_FOUND));
      }

      if (user.dataValues.role !== ROLES.ADMIN) {
        logger.error(`User with ID: ${id} isn't admin`);
        return next(
          new ApiError(
            StatusCodes.UNPROCESSABLE_ENTITY,
            ERROR.USER_IS_NOT_ADMIN,
          ),
        );
      }

      user.role = ROLES.USER;
      await user.save();

      logger.info(`The user with ID: ${id} become User`);
      return res.json({
        message: "The user has become an User",
      });
    } catch (e) {
      logger.error("Error when downgrading to user", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new SuperAdminControllers();
