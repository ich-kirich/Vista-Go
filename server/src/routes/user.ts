import { Router } from "express";
import UserControllers from "../controllers/UserControllers";
import AuthMiddleware from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/registration", UserControllers.registration);
userRouter.post("/login", UserControllers.login);
userRouter.get("/auth", AuthMiddleware, UserControllers.checkAuth);

export default userRouter;
