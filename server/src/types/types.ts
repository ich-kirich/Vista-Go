import { UploadedFile } from "express-fileupload";

export interface IDeleteVerification {
  timeCrone: string;
  timeToDelete: number;
}

export interface IGenerateJwt {
  id: number;
  email: string;
  name: string;
  image: string;
  role: string;
  isBanned: string;
}

export interface ICreateRecordGuide {
  image: UploadedFile;
  name: string;
  userId: number;
  cityIds: string[];
  sightIds: string[];
  contacts: string;
  description: string;
}

export interface ICreateRecordSight {
  image: UploadedFile;
  name: string;
  description: string;
  tagIds: string[];
  guideIds: string[];
  lat: string;
  lon: string;
}

export interface IUpdateRecordSight extends ICreateRecordSight {
  id: number;
}

export interface ICreateRecordCity {
  image: UploadedFile;
  country: { en: string; ru: string };
  name: { en: string; ru: string };
  lat: string;
  lon: string;
  sightIds: number[];
  guideIds: number[];
}

export interface IUpdateRecordCity {
  id: number;
  image?: UploadedFile;
  country?: { en: string; ru: string };
  name?: { en: string; ru: string };
  lat?: string;
  lon?: string;
  sightIds: number[];
  guideIds: number[];
}
