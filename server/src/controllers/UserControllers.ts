import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import sendEmail from "../services/sendEmails";
import ApiError from "../error/apiError";
import {
  ChangeUserPassword,
  checkVerefication,
  createUser,
  createVerefication,
  loginUser,
  updateImageUser,
  updateNameUser,
  validateFile,
  validateLogin,
  validateName,
  validatePassword,
  validationRegistration,
} from "../services/userServices";
import { CODE_SEND } from "../libs/constants";

class UserControllers {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const checkInput = await validationRegistration(email, password, name);
      if (checkInput instanceof ApiError) {
        return next(checkInput);
      }
      const verificationCode = await createVerefication(email);
      const trySend = await sendEmail(verificationCode, email);
      if (trySend instanceof ApiError) {
        return next(trySend);
      }
      return res.json(CODE_SEND);
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

  async updateUserImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const { image } = req.files;
      const checkFile = await validateFile(image as UploadedFile);
      if (checkFile instanceof ApiError) {
        return next(checkFile);
      }
      const resUpdate = await updateImageUser(
        id,
        image as UploadedFile,
        checkFile as string,
      );
      return res.json(resUpdate);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async createVerificationUserPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const checkPassword = validatePassword(password, email);
      if (checkPassword instanceof ApiError) {
        return next(checkPassword);
      }
      const verificationCode = await createVerefication(email);
      const trySend = await sendEmail(verificationCode, email);
      if (trySend instanceof ApiError) {
        return next(trySend);
      }
      return res.json(CODE_SEND);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async checkVerificationUserPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password, code } = req.body;
      const checkVerification = await checkVerefication(email, code);
      if (checkVerification instanceof ApiError) {
        return next(checkVerification);
      }
      const updatePassword = await ChangeUserPassword(email, password);
      return res.json(updatePassword);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }

  async checkVareficationCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, password, email, code } = req.body;
      const checkVerification = await checkVerefication(email, code);
      if (checkVerification instanceof ApiError) {
        return next(checkVerification);
      }
      const resultCreate = await createUser(name, email, password);
      return res.json(resultCreate);
    } catch (e) {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
    }
  }
}

export default new UserControllers();
