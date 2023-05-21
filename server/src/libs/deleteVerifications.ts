import cron from "node-cron";
import { Op } from "sequelize";
import Verification from "../../models/verification";

const job = cron.schedule("0 */2 * * *", async () => {
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // Получаем время два часа назад
  await Verification.destroy({
    where: {
      updatedAt: {
        [Op.lte]: twoHoursAgo,
      },
    },
  });
});

export default job;
