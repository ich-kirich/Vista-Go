import { Router } from "express";
import AdminControllers from "../controllers/AdminControllers";
import checkRole from "../middleware/checkRoleMiddleware";

const adminRouter = Router();

adminRouter.post(
  "/create/recommend",
  checkRole("ADMIN"),
  AdminControllers.createRecommend,
);
adminRouter.delete(
  "/delete/recommend/:id",
  checkRole("ADMIN"),
  AdminControllers.deleteRecommend,
);

adminRouter.post(
  "/create/city",
  checkRole("ADMIN"),
  AdminControllers.createCity,
);
adminRouter.post(
  "/update/city",
  checkRole("ADMIN"),
  AdminControllers.updateCity,
);
adminRouter.delete(
  "/delete/city/:id",
  checkRole("ADMIN"),
  AdminControllers.deleteCity,
);

adminRouter.post(
  "/create/sight",
  checkRole("ADMIN"),
  AdminControllers.createSight,
);
adminRouter.post(
  "/update/sight",
  checkRole("ADMIN"),
  AdminControllers.updateSight,
);
adminRouter.delete(
  "/delete/sight/:id",
  checkRole("ADMIN"),
  AdminControllers.deleteSight,
);

adminRouter.post("/create/tag", checkRole("ADMIN"), AdminControllers.createTag);
adminRouter.post("/update/tag", checkRole("ADMIN"), AdminControllers.updateTag);
adminRouter.delete(
  "/delete/tag/:id",
  checkRole("ADMIN"),
  AdminControllers.deleteTag,
);

adminRouter.post(
  "/create/guide",
  checkRole("ADMIN"),
  AdminControllers.createGuide,
);
adminRouter.post(
  "/update/guide",
  checkRole("ADMIN"),
  AdminControllers.updateGuide,
);
adminRouter.delete(
  "/delete/guide/:id",
  checkRole("ADMIN"),
  AdminControllers.deleteGuide,
);

export default adminRouter;
