import { Router } from "express";
import SightsControllers from "../controllers/SightsControllers";

const SightsRouter = Router();

SightsRouter.get("/sights/city/:cityId", SightsControllers.getCitySights);
SightsRouter.get("/sights/:sightId", SightsControllers.getSight);
SightsRouter.get("/sights/", SightsControllers.getAllSights);
SightsRouter.get("/sightsCount", SightsControllers.getCount);
SightsRouter.get("/sightsDiff", SightsControllers.getDiffTime);

export default SightsRouter;
