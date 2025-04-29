import { Router } from "express";
import UserControllers from "../controllers/UserControllers";
import { ROLES } from "../libs/constants";
import checkRole from "../middleware/checkRoleMiddleware";

const userRouter = Router();

userRouter.post("/registration", UserControllers.registration);
userRouter.post("/login", UserControllers.login);
userRouter.post("/verification/check", UserControllers.checkVerificationUser);
userRouter.post(
  "/password/change",
  UserControllers.createVerificationUserPassword,
);
userRouter.post(
  "/password/check",
  UserControllers.checkVerificationUserPassword,
);
userRouter.post(
  "/guide/request",
  checkRole([ROLES.USER]),
  UserControllers.createGuideRequest,
);

export default userRouter;
