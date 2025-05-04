import { Router } from "express";
import AdminControllers from "../controllers/AdminControllers";
import SuperAdminControllers from "../controllers/SuperAdminControllers";
import checkRole from "../middleware/checkRoleMiddleware";
import { ROLES } from "../libs/constants";

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

adminRouter.post("/ban/user", AdminControllers.banUser);
adminRouter.post("/unban/user", AdminControllers.unBanUser);
adminRouter.get("/users", AdminControllers.getAllUsers);
adminRouter.get("/guide/requests", AdminControllers.getAllGuideRequests);
adminRouter.delete(
  "/guide/request/:id/reject",
  AdminControllers.rejectGuideRequest,
);
adminRouter.post(
  "/guide/request/:id/accept",
  AdminControllers.acceptGuideRequest,
);

adminRouter.post(
  "/upgrade/user/:id/",
  checkRole([ROLES.SUPER_ADMIN]),
  SuperAdminControllers.upgradeToAdmin,
);

adminRouter.post(
  "/downgrade/user/:id/",
  checkRole([ROLES.SUPER_ADMIN]),
  SuperAdminControllers.downgradeAdmin,
);

export default adminRouter;
