import config from "config";
import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ERROR } from "../libs/constants";

const checkRole =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: ERROR.NOT_AUTHORIZED });
      }
      const decoded = jwt.verify(
        token,
        config.get("jwt.secretKey"),
      ) as JwtPayload;
      if (decoded.role !== role) {
        res.status(403).json({ message: ERROR.NO_ACCESS });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: ERROR.NOT_AUTHORIZED });
    }
  };

export default checkRole;
