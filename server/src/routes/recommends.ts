import { Router } from "express";
import RecommendsControllers from "../controllers/RecommendsControllers";

const RecommendsRouter = Router();

RecommendsRouter.get("/recommends", RecommendsControllers.getRecommends);

export default RecommendsRouter;
