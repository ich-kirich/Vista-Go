import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import logger from "../libs/logger";
import Tag from "../../models/tag";
import User from "../../models/user";
import ApiError from "../error/apiError";
import {
  EMAIL_SUBJECTS,
  ERROR,
  RECORD_DELETED,
  ROLES,
} from "../libs/constants";
import {
  createRecordCity,
  createRecordGuide,
  createRecordRecommend,
  createRecordSight,
  deleteRecordCity,
  deleteRecordGuide,
  deleteRecordRecommend,
  deleteRecordSight,
  deleteRecordTag,
  updateRecordCity,
  updateRecordGuide,
  updateRecordSight,
} from "../services/adminServices";
import GuideRequest from "../../models/guideRequest";
import Guide from "../../models/guide";
import {
  getAcceptGuideRequestEmailTextForUser,
  getRejectGuideRequestEmailTextForUser,
} from "../libs/utils";
import sendEmail from "../libs/sendEmails";

class AdminControllers {
  async createRecommend(req: Request, res: Response, next: NextFunction) {
    try {
      const { cityId } = req.body;
      const recommend = await createRecordRecommend(cityId);
      logger.info("Recommendation was successfully created", recommend);
      return res.json(recommend);
    } catch (e) {
      logger.error("Error during creating a recommendation", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteRecommend(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteRecommend = await deleteRecordRecommend(Number(id));
      logger.info(
        `Recommendation with this ID: ${id} has been successfully deleted`,
      );
      return res.json(RECORD_DELETED);
    } catch (e) {
      logger.error("Error during deleting a recommendation", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { lat, lon, sightIds, guideIds } = req.body;
      const { image } = req.files;
      const sightIdsArr = sightIds ? JSON.parse(sightIds) : [];
      const guideIdsArr = guideIds ? JSON.parse(guideIds) : [];
      const name = req.body.name
        ? JSON.parse(req.body.name)
        : { en: "", ru: "" };
      const country = req.body.name
        ? JSON.parse(req.body.country)
        : { en: "", ru: "" };
      const city = await createRecordCity({
        image: image as UploadedFile,
        country,
        name,
        lat,
        lon,
        sightIds: sightIdsArr,
        guideIds: guideIdsArr,
      });
      logger.info("City was successfully created", city);
      return res.json(city);
    } catch (e) {
      logger.error("Error during creating a city", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, lat, lon, sightIds, guideIds } = req.body;
      const { image } = req.files || {};
      const sightIdsArr = sightIds ? JSON.parse(sightIds) : [];
      const guideIdsArr = guideIds ? JSON.parse(guideIds) : [];
      const name = req.body.name
        ? JSON.parse(req.body.name)
        : { en: "", ru: "" };
      const country = req.body.name
        ? JSON.parse(req.body.country)
        : { en: "", ru: "" };
      const city = await updateRecordCity({
        id,
        image: image as UploadedFile,
        country,
        name,
        lat,
        lon,
        sightIds: sightIdsArr,
        guideIds: guideIdsArr,
      });
      logger.info("City was successfully updated", city);
      return res.json(city);
    } catch (e) {
      logger.error("Error during updating a city", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteCity = await deleteRecordCity(Number(id));
      logger.info(`City with this ID: ${id} has been successfully deleted`);
      return res.json(RECORD_DELETED);
    } catch (e) {
      logger.error("Error during deleting a city", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createSight(req: Request, res: Response, next: NextFunction) {
    try {
      const { tagIds, guideIds } = req.body;
      const { image } = req.files;
      const name = req.body.name
        ? JSON.parse(req.body.name)
        : { en: "", ru: "" };
      const description = req.body.description
        ? JSON.parse(req.body.description)
        : { en: "", ru: "" };
      const tagIdsArr = tagIds ? JSON.parse(tagIds) : [];
      const guideIdsArr = tagIds ? JSON.parse(guideIds) : [];
      const sight = await createRecordSight({
        image: image as UploadedFile,
        name,
        description,
        tagIds: tagIdsArr,
        guideIds: guideIdsArr,
      });
      logger.info("Sight was successfully created", sight);
      return res.json(sight);
    } catch (e) {
      logger.error("Error during creating a sight", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateSight(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, tagIds, guideIds } = req.body;
      const { image } = req.files || {};
      const name = req.body.name
        ? JSON.parse(req.body.name)
        : { en: "", ru: "" };
      const description = req.body.description
        ? JSON.parse(req.body.description)
        : { en: "", ru: "" };
      const tagIdsArr = tagIds ? JSON.parse(tagIds) : [];
      const guideIdsArr = tagIds ? JSON.parse(guideIds) : [];
      const sight = await updateRecordSight({
        id,
        image: image as UploadedFile,
        name,
        description,
        tagIds: tagIdsArr,
        guideIds: guideIdsArr,
      });
      logger.info("Sight was successfully updated", sight);
      return res.json(sight);
    } catch (e) {
      logger.error("Error during updating a sight", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteSight(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteSight = await deleteRecordSight(Number(id));
      logger.info(`Sight with this ID: ${id} has been successfully deleted`);
      return res.json(RECORD_DELETED);
    } catch (e) {
      logger.error("Error during deleting a sight", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.body.name
        ? JSON.parse(req.body.name)
        : { en: "", ru: "" };
      const tag = await Tag.create({ name });
      logger.info("Tag was successfully created", tag);
      return res.json(tag);
    } catch (e) {
      logger.error("Error during creating a tag", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const name = req.body.name
        ? JSON.parse(req.body.name)
        : { en: "", ru: "" };
      const tag = await Tag.findByPk(id);
      if (tag) {
        await Tag.update({ name }, { where: { id } });
        const updatedTag = await Tag.findByPk(id);
        logger.info("Tag was successfully updated", tag);
        return res.json(updatedTag);
      }
      logger.error(`Tag with this ID: ${id} was not found`);
      return next(
        new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.TAG_NOT_FOUND),
      );
    } catch (e) {
      logger.error("Error during updating a tag", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteTag = await deleteRecordTag(Number(id));
      logger.info(`Tag with this ID: ${id} has been successfully deleted`);
      return res.json(RECORD_DELETED);
    } catch (e) {
      logger.error("Error during deleting a tag", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async createGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, contacts } = req.body;
      const { image } = req.files;
      const name = req.body.name
        ? JSON.parse(req.body.name)
        : { en: "", ru: "" };
      const cityIds = req.body.cityIds ? JSON.parse(req.body.cityIds) : [];
      const sightIds = req.body.sightIds ? JSON.parse(req.body.sightIds) : [];
      const description = req.body.description
        ? JSON.parse(req.body.description)
        : { en: "", ru: "" };
      const guide = await createRecordGuide({
        image: image as UploadedFile,
        contacts,
        description,
        cityIds,
        sightIds,
        userId,
        name,
      });
      logger.info("Guide was successfully created", guide);
      return res.json(guide);
    } catch (e) {
      logger.error("Error during creating a guide", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async updateGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, contacts } = req.body;
      const { image } = req.files || {};
      const name = req.body.name
        ? JSON.parse(req.body.name)
        : { en: "", ru: "" };
      const cityIds = req.body.cityIds ? JSON.parse(req.body.cityIds) : [];
      const sightIds = req.body.sightIds ? JSON.parse(req.body.sightIds) : [];
      const description = req.body.description
        ? JSON.parse(req.body.description)
        : { en: "", ru: "" };
      const guide = await updateRecordGuide(
        id,
        name,
        image as UploadedFile,
        description,
        contacts,
        cityIds,
        sightIds,
      );
      logger.info("Guide was successfully updated", guide);
      return res.json(guide);
    } catch (e) {
      logger.error("Error during updating a guide", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async deleteGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tryDeleteGuide = await deleteRecordGuide(Number(id));
      logger.info(`Guide with this ID: ${id} has been successfully deleted`);
      return res.json(RECORD_DELETED);
    } catch (e) {
      logger.error("Error during deleting a guide", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async banUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        logger.error(`User with this email: ${email} was not found`);
        return next(new ApiError(StatusCodes.NOT_FOUND, ERROR.USER_NOT_FOUND));
      }

      if (user.isBanned) {
        logger.error(`User with this email: ${email} is banned`);
        return next(new ApiError(StatusCodes.FORBIDDEN, ERROR.USER_IS_BANNED));
      }

      user.isBanned = true;
      await user.save();

      logger.info(
        `User with this email: ${email} has been successfully banned`,
      );
      return res.json({ success: true });
    } catch (e) {
      logger.error("Error during banning user", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async unBanUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        logger.error(`User with this email: ${email} was not found`);
        return next(new ApiError(StatusCodes.NOT_FOUND, ERROR.USER_NOT_FOUND));
      }

      if (!user.isBanned) {
        logger.error(`User with this email: ${email} is unbanned`);
        return next(
          new ApiError(StatusCodes.FORBIDDEN, ERROR.USER_IS_UNBANNED),
        );
      }

      user.isBanned = false;
      await user.save();

      logger.info(
        `User with this email: ${email} has been successfully unbanned`,
      );
      return res.json({ success: true });
    } catch (e) {
      logger.error("Error during unbanning user", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.findAll();

      logger.info("Fetched all users successfully");
      return res.json(users);
    } catch (e) {
      logger.error("Error during getting users", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async getAllGuideRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const guideRequests = await GuideRequest.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      logger.info("Fetched all guide requests with user info");
      return res.json(guideRequests);
    } catch (e) {
      logger.error("Error during fetching guide requests", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async rejectGuideRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const request = await GuideRequest.findByPk(id);
      if (!request) {
        logger.error(`Request with ID: ${id} not found`);
        return next(
          new ApiError(StatusCodes.NOT_FOUND, ERROR.GUIDE_REQUEST_NOT_FOUND),
        );
      }

      await request.destroy();

      const user = await User.findByPk(request.dataValues.userId);
      if (!user) {
        logger.error("User with this ID not found", request.dataValues.userId);
        throw new ApiError(StatusCodes.NOT_FOUND, ERROR.USER_NOT_FOUND);
      }
      const userEmailText = getRejectGuideRequestEmailTextForUser(
        user.dataValues.email,
      );
      await sendEmail(
        [user.dataValues.email],
        EMAIL_SUBJECTS.REJECT_GUIDE_REQUEST,
        userEmailText,
      );
      logger.info(
        `Application with ID: ${id} successfully rejected and deleted`,
      );
      return res.json({ message: "Application rejected and deleted" });
    } catch (e) {
      logger.error("Error when rejecting an application", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }

  async acceptGuideRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const request = await GuideRequest.findByPk(id);
      if (!request) {
        logger.error(`Application with ID: ${id} not found`);
        return next(
          new ApiError(StatusCodes.NOT_FOUND, ERROR.GUIDE_REQUEST_NOT_FOUND),
        );
      }

      const user = await User.findByPk(request.userId);
      if (!user) {
        logger.error(`User with ID: ${request.userId} not found`);
        return next(new ApiError(StatusCodes.NOT_FOUND, ERROR.USER_NOT_FOUND));
      }

      user.role = ROLES.GUIDE;
      await user.save();

      await Guide.create({
        userId: user.id,
        contacts: request.contacts,
        description: { en: "", ru: "" },
        name: { en: user.name, ru: user.name },
        image: user.image,
      });

      await request.destroy();

      const userEmailText = getAcceptGuideRequestEmailTextForUser(
        user.dataValues.email,
      );
      await sendEmail(
        [user.dataValues.email],
        EMAIL_SUBJECTS.ACCEPT_GUIDE_REQUEST,
        userEmailText,
      );

      logger.info(
        `The application with ID: ${id} is accepted. User with ID: ${user.id} became a guide.`,
      );
      return res.json({
        message: "Application accepted. The user has become a guide.",
      });
    } catch (e) {
      logger.error("Error when accepting an application", e);
      return next(
        new ApiError(e.status || StatusCodes.INTERNAL_SERVER_ERROR, e.message),
      );
    }
  }
}

export default new AdminControllers();
