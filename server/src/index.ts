import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import ErrorHandling from "./middleware/errorhandlingmiddleware";
import router from "./routes/router";
import ApiError from "./error/apiError";

const app = express();
app.use(express.json());
app.use(cors());
app.use("", router);
app.use(ErrorHandling);
const port = process.env.PORT || "5000";

const startServer = async () => {
  try {
    app.listen(port, () => console.log(`Running on port ${port}`));
  } catch (e) {
    console.error(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
  }
};

startServer();
