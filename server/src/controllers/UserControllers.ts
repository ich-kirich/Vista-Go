import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";
import {
  сhangeUserPassword,
  createUser,
  loginUser,
  updateImageUser,
  updateNameUser,
  registrationUser,
  verificationPassword,
} from "../services/userServices";
import { CODE_SEND } from "../libs/constants";
import logger from "../libs/logger";

class UserControllers {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const tryRegistration = await registrationUser(email, password, name);
      logger.info("The user was successfully registered as unverified");
      return res.json(CODE_SEND);
    } catch (e) {
      logger.error("Error occurred during user registration as unverified:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const resultLogin = await loginUser(email, password);
      logger.info(`User with this email: ${email} was successfully logged in`);
      return res.json(resultLogin);
    } catch (e) {
      logger.error("Error during the login of the user:", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateUserName(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name } = req.body;
      const updateName = await updateNameUser(id, name);
      logger.info(
        `Name of user with this ID: ${id} has been successfully updated`,
        name,
      );
      return res.json(updateName);
    } catch (e) {
      logger.error("Error during updating username", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateUserImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const { image } = req.files;
      const resUpdate = await updateImageUser(id, image as UploadedFile);
      logger.info(
        `Image of user with this ID: ${id} has been successfully updated`,
        image,
      );
      return res.json(resUpdate);
    } catch (e) {
      logger.error("Error during updating user image", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createVerificationUserPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const verifyPassword = await verificationPassword(password, email);
      logger.info("Verification code to change the password has been created");
      return res.json(CODE_SEND);
    } catch (e) {
      logger.error(
        "Error during creating a verification code to change the password:",
        e,
      );
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async checkVerificationUserPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password, code } = req.body;
      const updatePassword = await сhangeUserPassword(email, password, code);
      logger.info(
        `The password was successfully changed for a user with this email: ${email}`,
      );
      return res.json(updatePassword);
    } catch (e) {
      logger.error("Error during confirming a password change", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async checkVerificationCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, password, email, code } = req.body;
      const resultCreate = await createUser({ name, email, password, code });
      logger.info("Verification code has been successfully verified");
      return res.json(resultCreate);
    } catch (e) {
      logger.error("Error during confirming the verification code", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new UserControllers();
