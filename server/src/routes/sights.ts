import { Router } from "express";
import SightsControllers from "../controllers/SightsControllers";

const SightsRouter = Router();

SightsRouter.get("/sights/city/:cityId", SightsControllers.getCitySights);
SightsRouter.get("/sights/:sightId", SightsControllers.getSight);
SightsRouter.get("/sights/", SightsControllers.getAllSights);

export default SightsRouter;
