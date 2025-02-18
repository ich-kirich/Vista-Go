import { Router } from "express";
import GuidesControllers from "../controllers/GuidesControllers";

const GuidesRouter = Router();

GuidesRouter.get("/guides", GuidesControllers.getGuides);
GuidesRouter.get("/guidesCount", GuidesControllers.getCount);

export default GuidesRouter;
