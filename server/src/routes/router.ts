import { Router } from "express";
import adminRouter from "./admin";
import CitiesRouter from "./cities";
import GuidesRouter from "./guides";
import RecommendsRouter from "./recommends";
import SightsRouter from "./sights";
import TagsRouter from "./tags";
import changeUserRouter from "./changeUser";
import checkRole from "../middleware/checkRoleMiddleware";
import { ADMIN_ROLE, USER_ROLE } from "../libs/constants";
import userRouter from "./user";

const router = Router();
router.use("/", CitiesRouter);
router.use("/", RecommendsRouter);
router.use("/", SightsRouter);
router.use("/", GuidesRouter);
router.use("/", TagsRouter);
router.use("/user", userRouter);
router.use(
  "/user/update",
  checkRole([ADMIN_ROLE, USER_ROLE]),
  changeUserRouter,
);
router.use("/admin", checkRole([ADMIN_ROLE]), adminRouter);

export default router;
