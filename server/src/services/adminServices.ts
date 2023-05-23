import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import { UploadedFile } from "express-fileupload";
import { uploadImageToApi } from "../libs/utils";
import ApiError from "../error/apiError";
import { ERROR } from "../libs/constants";
import Guide from "../../models/guide";
import { validateFile } from "./userServices";
import Tag from "../../models/tag";

async function isGuideExsist(id: number) {
  const guide = await Guide.findByPk(id);

  if (guide) {
    return true;
  }
  return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.GUIDE_NOT_FOUND);
}

export async function createGuide(image: UploadedFile, name: string) {
  const checkFile = await validateFile(image);
  if (checkFile instanceof ApiError) {
    return checkFile;
  }
  const fileName = `${uuidv4()}.${checkFile as string}`;
  const loadImage = await uploadImageToApi(image, fileName);
  if (loadImage instanceof ApiError) {
    return loadImage;
  }
  const guide = await Guide.create({ name, image: loadImage });
  return guide;
}

export async function updateGuide(
  id: number,
  name: string,
  image: UploadedFile,
) {
  const findGuide = await isGuideExsist(id);
  if (findGuide instanceof ApiError) {
    return findGuide;
  }
  if (name) {
    await Guide.update({ name }, { where: { id } });
  }
  if (image) {
    const checkFile = await validateFile(image);
    if (checkFile instanceof ApiError) {
      return checkFile;
    }
    const fileName = `${uuidv4()}.${checkFile as string}`;
    const loadImage = await uploadImageToApi(image, fileName);
    if (loadImage instanceof ApiError) {
      return loadImage;
    }
    await Guide.update({ image: loadImage }, { where: { id } });
  }
  const guide = await Guide.findByPk(id);
  return guide;
}

export async function deleteRecordGuide(id: number) {
  const guide = await Guide.findByPk(id);
  if (guide) {
    await Guide.destroy({
      where: {
        id,
      },
    });
    return true;
  }
  return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.GUIDE_NOT_FOUND);
}

export async function deleteRecordTag(id: number) {
  const tag = await Tag.findByPk(id);
  if (tag) {
    await Tag.destroy({
      where: {
        id,
      },
    });
    return true;
  }
  return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, ERROR.TAG_NOT_FOUND);
}
