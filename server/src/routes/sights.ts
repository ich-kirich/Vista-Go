import { Router } from "express";
import SightsControllers from "../controllers/SightsControllers";

const SightsRouter = Router();

SightsRouter.get("/:id/sights", SightsControllers.getCitySights);
SightsRouter.get("/:id/sights/:id", SightsControllers.getSight);

export default SightsRouter;
