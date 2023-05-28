import { Router } from "express";
import UserControllers from "../controllers/UserControllers";

const userRouter = Router();

userRouter.post("/registration", UserControllers.registration);
userRouter.post("/login", UserControllers.login);
userRouter.post("/verification/check", UserControllers.checkVerificationCode);
userRouter.post(
  "/password/change",
  UserControllers.createVerificationUserPassword,
);
userRouter.post(
  "/password/check",
  UserControllers.checkVerificationUserPassword,
);

export default userRouter;
