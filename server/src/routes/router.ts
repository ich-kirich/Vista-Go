import { Router } from "express";
import CitiesRouter from "./cities";
import RecommendsRouter from "./recommends";
import SightsRouter from "./sights";

const router = Router();
router.use("/", CitiesRouter);
router.use("/", RecommendsRouter);
router.use("/", SightsRouter);

export default router;
