import { Router } from "express";
import CitiesControllers from "../controllers/citiesControllers";

const CitiesRouter = Router();

CitiesRouter.get("/cities", CitiesControllers.getCities);
CitiesRouter.get("/city/:id", CitiesControllers.getCity);

export default CitiesRouter;
