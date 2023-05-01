import { NextFunction, Response, Request } from "express";
import ApiError from "../error/apiError";

function ErrorHandling(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Unexpected error" });
  }
}

export default ErrorHandling;
