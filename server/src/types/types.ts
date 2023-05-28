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

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  code: string;
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
  country: string;
  name: string;
  lat: string;
  lon: string;
  sightIds: string[];
  guideIds: string[];
}

export interface IUpdateRecordCity extends ICreateRecordCity {
  id: number;
}
