import config from "config";
import cron from "node-cron";
import { Op } from "sequelize";
import { IDeleteVerification } from "../types/types";
import VerificationPassword from "../../models/verificationPassword";
import logger from "./logger";
import VerificationUser from "../../models/verificationUser";

const deleteVerification: IDeleteVerification =
  config.get("deleteVerification");

const job = cron.schedule(deleteVerification.timeCrone, async () => {
  const twoHoursAgo = new Date(deleteVerification.timeToDelete);
  await VerificationPassword.destroy({
    where: {
      updatedAt: {
        [Op.lte]: twoHoursAgo,
      },
    },
  });
  await VerificationUser.destroy({
    where: {
      updatedAt: {
        [Op.lte]: twoHoursAgo,
      },
    },
  });
  logger.info("Verification password records deleted successfully");
});

export default job;
