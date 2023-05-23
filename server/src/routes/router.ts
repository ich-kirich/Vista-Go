import { Router } from "express";
import adminRouter from "./admin";
import CitiesRouter from "./cities";
import GuidesRouter from "./guides";
import RecommendsRouter from "./recommends";
import SightsRouter from "./sights";
import userRouter from "./user";

const router = Router();
router.use("/", CitiesRouter);
router.use("/", RecommendsRouter);
router.use("/", SightsRouter);
router.use("/", GuidesRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);

export default router;
