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
}

export interface ICreateRecordSight {
  image: UploadedFile;
  name: string;
  description: string;
  price: string;
  distance: string;
  tagIds: string[];
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
