import { Router } from "express";
import TagsControllers from "../controllers/TagsControllers";

const TagsRouter = Router();

TagsRouter.get("/tags", TagsControllers.getTags);

export default TagsRouter;
