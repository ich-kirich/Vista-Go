import { Router } from "express";
import adminRouter from "./admin";
import CitiesRouter from "./cities";
import GuidesRouter from "./guides";
import RecommendsRouter from "./recommends";
import SightsRouter from "./sights";
import TagsRouter from "./tags";
import changeUserRouter from "./changeUser";
import checkRole from "../middleware/checkRoleMiddleware";
import userRouter from "./user";
import { ROLES } from "../libs/constants";

const router = Router();
router.use("/", CitiesRouter);
router.use("/", RecommendsRouter);
router.use("/", SightsRouter);
router.use("/", GuidesRouter);
router.use("/", TagsRouter);
router.use("/user", userRouter);
router.use(
  "/user/update",
  checkRole([ROLES.ADMIN, ROLES.USER, ROLES.GUIDE]),
  changeUserRouter,
);
router.use("/admin", checkRole([ROLES.ADMIN]), adminRouter);

export default router;
