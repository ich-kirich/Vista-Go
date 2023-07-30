import { Router } from "express";
import AdminControllers from "../controllers/AdminControllers";

const adminRouter = Router();

adminRouter.post("/create/recommend", AdminControllers.createRecommend);
adminRouter.delete("/delete/recommend/:id", AdminControllers.deleteRecommend);

adminRouter.post("/create/city", AdminControllers.createCity);
adminRouter.post("/update/city", AdminControllers.updateCity);
adminRouter.delete("/delete/city/:id", AdminControllers.deleteCity);

adminRouter.post("/create/sight", AdminControllers.createSight);
adminRouter.post("/update/sight", AdminControllers.updateSight);
adminRouter.delete("/delete/sight/:id", AdminControllers.deleteSight);

adminRouter.post("/create/tag", AdminControllers.createTag);
adminRouter.post("/update/tag", AdminControllers.updateTag);
adminRouter.delete("/delete/tag/:id", AdminControllers.deleteTag);

adminRouter.post("/create/guide", AdminControllers.createGuide);
adminRouter.post("/update/guide", AdminControllers.updateGuide);
adminRouter.delete("/delete/guide/:id", AdminControllers.deleteGuide);

export default adminRouter;
