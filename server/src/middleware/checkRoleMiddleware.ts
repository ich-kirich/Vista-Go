import { NextFunction, Response, Request } from "express";
import { decodeJwt } from "../libs/jwtUtils";
import { ERROR, TYPE_TOKEN } from "../libs/constants";
import logger from "../libs/logger";

const checkRole =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const typeToken = req.headers.authorization.split(" ")[0];
      if (typeToken !== TYPE_TOKEN) {
        logger.error("Invalid token type");
        res.status(401).json({ message: ERROR.INVALID_TYPE_TOKEN });
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        logger.error("Authorization token not provided");
        res.status(401).json({ message: ERROR.NOT_AUTHORIZED });
      }
      const decoded = decodeJwt(token);
      if (!roles.includes(decoded.role)) {
        logger.error("Unauthorized access");
        res.status(403).json({ message: ERROR.NO_ACCESS });
      }
      req.user = decoded;
      next();
    } catch (e) {
      logger.error("Error occurred during role check:", e);
      res.status(401).json({ message: ERROR.NOT_AUTHORIZED });
    }
  };

export default checkRole;
