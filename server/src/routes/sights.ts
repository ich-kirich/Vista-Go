import { Router } from "express";
import SightsControllers from "../controllers/SightsControllers";

const SightsRouter = Router();

SightsRouter.get("/:id/sights", SightsControllers.getCitySights);
SightsRouter.get("/sights/:id", SightsControllers.getSight);
SightsRouter.get("/sights/", SightsControllers.getAllSights);
SightsRouter.get("/sightsCount", SightsControllers.getCount);
SightsRouter.get("/sightsDiff", SightsControllers.getDiffTime);

export default SightsRouter;
