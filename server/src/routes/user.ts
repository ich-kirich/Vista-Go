import { Router } from "express";
import UserControllers from "../controllers/UserControllers";

const userRouter = Router();

userRouter.post("/registration", UserControllers.registration);
userRouter.post("/login", UserControllers.login);
userRouter.post("/update/name", UserControllers.updateUserName);
userRouter.post("/update/image", UserControllers.updateUserImage);
userRouter.post("/verification/check", UserControllers.checkVareficationCode);

export default userRouter;
