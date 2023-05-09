import { Router } from "express";
import CitiesControllers from "../controllers/CitiesControllers";

const CitiesRouter = Router();

CitiesRouter.get("/cities", CitiesControllers.getCities);
CitiesRouter.get("/cities/:id", CitiesControllers.getCity);

export default CitiesRouter;
