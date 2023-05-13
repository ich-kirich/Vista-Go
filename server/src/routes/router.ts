import { Router } from "express";
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

export default router;
