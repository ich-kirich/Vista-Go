import axios from "axios";
import FormData from "form-data";
import config from "config";
import { StatusCodes } from "http-status-codes";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import ApiError from "../error/apiError";
import { ERROR } from "./constants";

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
    return response.data.data.url;
  } catch (e) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
  }
}

export async function getWeather(lat: string, lon: string) {
  const apiKey = config.get("weather.apiKey");
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    );
    return String(response.data.main.temp);
  } catch (e) {
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
    throw new ApiError(StatusCodes.BAD_REQUEST, ERROR.FILE_NOT_IMAGE);
  }
  return fileExtension;
}

export async function uploadImage(image: UploadedFile) {
  const checkFile = await validateFile(image);
  const fileName = `${uuidv4()}.${checkFile as string}`;
  const loadImage = await uploadImageToApi(image, fileName);
  return loadImage;
}
