import { NextFunction, Response, Request } from "express";
import { decodeJwt } from "../libs/jwtUtils";
import { ERROR, TYPE_TOKEN } from "../libs/constants";

const checkRole =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const typeToken = req.headers.authorization?.split(" ")[0];
      if (typeToken !== TYPE_TOKEN) {
        res.status(401).json({ message: ERROR.INVALID_TYPE_TOKEN });
      }
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: ERROR.NOT_AUTHORIZED });
      }
      const decoded = decodeJwt(token);
      if (!roles.includes(decoded.role)) {
        res.status(403).json({ message: ERROR.NO_ACCESS });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: ERROR.NOT_AUTHORIZED });
    }
  };

export default checkRole;
