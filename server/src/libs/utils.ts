import axios from "axios";
import FormData from "form-data";
import config from "config";
import { StatusCodes } from "http-status-codes";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import ApiError from "../error/apiError";
import { ERROR } from "./constants";
import logger from "./logger";
import User from "../../models/user";

async function uploadImageToApi(image: UploadedFile, name: string) {
  try {
    const formData = new FormData();
    formData.append("image", image.data, name);
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${config.get("imageStorage.apiKey")}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const imageUrl = response.data.data.url;
    logger.info("Image was successfully uploaded to the api", imageUrl);
    return imageUrl;
  } catch (e) {
    logger.error("error during uploading a image ti the api", e);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
  }
}

export async function getWeather(lat: string, lon: string) {
  const apiKey = config.get("weather.apiKey");
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    );
    const temperature = String(response.data.main.temp);
    logger.info(
      `Weather fetched for coordinates (${lat}, ${lon}): ${temperature}°C`,
    );
    return temperature;
  } catch (e) {
    logger.error(
      `Error occurred while fetching weather for coordinates (${lat}, ${lon}):`,
      e,
    );
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
  }
}

export function mergeCityFields(arr: any) {
  return arr.map((item) => {
    const { City, ...rest } = item.dataValues;
    const result = { ...City.dataValues, ...rest };
    return result;
  });
}

export async function validateFile(image: UploadedFile) {
  const fileExtension = mime.extension((image as UploadedFile).mimetype);
  if (
    !fileExtension ||
    !(image as UploadedFile).mimetype.startsWith("image/")
  ) {
    logger.error("File entered is not an image", image);
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.FILE_NOT_IMAGE);
  }
  logger.info("Entered file was validated successfully");
  return fileExtension;
}

export async function uploadImage(image: UploadedFile) {
  const checkFile = await validateFile(image);
  const fileName = `${uuidv4()}.${checkFile as string}`;
  const loadImage = await uploadImageToApi(image, fileName);
  return loadImage;
}

export function getCreateGuideRequestEmailTextForUser(
  user: User,
  contacts: string,
  requestText: string,
) {
  return `Dear ${user.name},
  We have received your guide application request and it is currently under review by our administration team.

  The information you sent:

  Email: ${user.email}
  Contacts: ${contacts}
  Request Text: ${requestText}

  Thank you for your interest in becoming a guide!

  Best regards,
  Support Team`;
}

export function getCreateGuideRequestEmailTextForAdmin(
  user: User,
  userId: number,
  contacts: string,
  requestText: string,
) {
  return `A new guide request has been submitted.
    User ID: ${userId}
    Email: ${user.email}
    Contacts: ${contacts}
    Request Text: ${requestText}

    Please review and process this request accordingly.`;
}

export function getRejectGuideRequestEmailTextForUser(userEmail: string) {
  return `Dear ${userEmail},
  We regret to inform you that your application to become a guide has been declined.

  Thank you for your interest, and feel free to reapply in the future if your circumstances change.

  Best regards,
  Support Team`;
}

export function getAcceptGuideRequestEmailTextForUser(userEmail: string) {
  return `Dear ${userEmail},
  Congratulations! Your application to become a guide has been accepted.

  You can now access guide features and begin your journey with us.

  Best regards,
  Support Team`;
}
