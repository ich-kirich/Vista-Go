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
