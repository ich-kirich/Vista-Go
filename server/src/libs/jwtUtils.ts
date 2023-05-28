import config from "config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IGenerateJwt } from "../types/types";

export function generateJwt(params: IGenerateJwt) {
  return jwt.sign(params, config.get("jwt.secretKey"), {
    expiresIn: "24h",
  });
}

export function decodeJwt(token: string) {
  return jwt.verify(token, config.get("jwt.secretKey")) as JwtPayload;
}
