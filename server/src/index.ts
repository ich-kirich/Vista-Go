import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import config from "config";
import path from "path";
import fileUpload from "express-fileupload";
import initDb from "../models/initDb";
import ErrorHandling from "./middleware/errormiddleware";
import router from "./routes/router";
import ApiError from "./error/apiError";

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "static")));
app.use(fileUpload({}));
app.use(cors());
app.use("", router);
app.use(ErrorHandling);
const port = config.get("server.port") || "5000";

const startServer = async () => {
  try {
    await initDb();
    app.listen(port, () => console.log(`Running on port ${port}`));
  } catch (e) {
    console.error(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
  }
};

startServer();
