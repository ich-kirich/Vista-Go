import { Router } from "express";
import CitiesRouter from "./cities";

const router = Router();
router.use("/", CitiesRouter);

export default router;
