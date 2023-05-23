import { Router } from "express";
import AdminControllers from "../controllers/AdminControllers";
import checkRole from "../middleware/checkRoleMiddleware";

const adminRouter = Router();

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
  "/delete/guide",
  checkRole("ADMIN"),
  AdminControllers.deleteGuide,
);

export default adminRouter;
