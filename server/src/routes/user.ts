import { Router } from "express";
import UserControllers from "../controllers/UserControllers";

const userRouter = Router();

userRouter.post("/registration", UserControllers.registration);
userRouter.post("/login", UserControllers.login);

export default userRouter;
