import { Router } from "express";
import CitiesControllers from "../controllers/citiesControllers";

const CitiesRouter = Router();

CitiesRouter.get("/cities", CitiesControllers.getCities);
CitiesRouter.get("/cities/:id", CitiesControllers.getCity);
CitiesRouter.get("/recommends", CitiesControllers.getRecommends);
CitiesRouter.get("/recommends/:id", CitiesControllers.getRecommend);

export default CitiesRouter;
