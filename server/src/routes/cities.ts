import { Router } from "express";
import CitiesControllers from "../controllers/CitiesControllers";

const CitiesRouter = Router();

CitiesRouter.get("/cities", CitiesControllers.getCities);
CitiesRouter.get("/city/:id", CitiesControllers.getCity);
CitiesRouter.get("/cityCount", CitiesControllers.getCount);
CitiesRouter.get("/cityCoord", CitiesControllers.getCoord);

export default CitiesRouter;
