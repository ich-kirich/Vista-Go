import { Router } from "express";
import UserControllers from "../controllers/UserControllers";

const changeUserRouter = Router();

changeUserRouter.post("/name", UserControllers.updateUserName);
changeUserRouter.post("/image", UserControllers.updateUserImage);

export default changeUserRouter;
