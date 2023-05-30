import config from "config";
import cron from "node-cron";
import { Op } from "sequelize";
import { IDeleteVerification } from "../types/types";
import Verification from "../../models/verification";
import logger from "./logger";

const deleteVerification: IDeleteVerification =
  config.get("deleteVerification");

const job = cron.schedule(deleteVerification.timeCrone, async () => {
  const twoHoursAgo = new Date(deleteVerification.timeToDelete);
  await Verification.destroy({
    where: {
      updatedAt: {
        [Op.lte]: twoHoursAgo,
      },
    },
  });
  logger.info("Verification records deleted successfully");
});

export default job;
