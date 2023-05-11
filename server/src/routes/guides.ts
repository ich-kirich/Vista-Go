import { Router } from "express";
import GuidesControllers from "../controllers/GuidesControllers";

const GuidesRouter = Router();

GuidesRouter.get("/guides", GuidesControllers.getGuides);

export default GuidesRouter;
