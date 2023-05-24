import { Router } from "express";
import adminRouter from "./admin";
import CitiesRouter from "./cities";
import GuidesRouter from "./guides";
import RecommendsRouter from "./recommends";
import SightsRouter from "./sights";
import TagsRouter from "./tags";
import userRouter from "./user";

const router = Router();
router.use("/", CitiesRouter);
router.use("/", RecommendsRouter);
router.use("/", SightsRouter);
router.use("/", GuidesRouter);
router.use("/", TagsRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);

export default router;
