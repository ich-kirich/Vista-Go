import { Router } from "express";
import UserControllers from "../controllers/UserControllers";

const userRouter = Router();

userRouter.post("/registration", UserControllers.registration);
userRouter.post("/login", UserControllers.login);
userRouter.post("/update/name", UserControllers.updateUserName);

export default userRouter;
