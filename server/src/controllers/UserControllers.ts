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

class UserControllers {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const tryRegistration = await registrationUser(email, password, name);
      return res.json(CODE_SEND);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const resultLogin = await loginUser(email, password);
      return res.json(resultLogin);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateUserName(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name } = req.body;
      const updateName = await updateNameUser(id, name);
      return res.json(updateName);
    } catch (e) {
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
      return res.json(resUpdate);
    } catch (e) {
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
      return res.json(CODE_SEND);
    } catch (e) {
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
      return res.json(updatePassword);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async checkVerificationCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, password, email, code } = req.body;
      const resultCreate = await createUser({ name, email, password, code });
      return res.json(resultCreate);
    } catch (e) {
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new UserControllers();
