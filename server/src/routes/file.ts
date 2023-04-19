import { Router } from "express";
import FileControllers from "../controllers/fileControllers";

const FileRouter = Router();

FileRouter.get("/", FileControllers.getInf);

export default FileRouter;
