import { Router } from "express";
import FileCouter from "./file";

const router = Router();
router.use("/", FileCouter);

export default router;
