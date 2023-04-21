import { Router } from "express";
import FileControllers from "../controllers/fileControllers";

const FileRouter = Router();

FileRouter.get("/cities", FileControllers.getInf);
FileRouter.get("/recommends", FileControllers.getRec);

export default FileRouter;
