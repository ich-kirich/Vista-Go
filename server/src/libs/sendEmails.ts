import config from "config";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import ApiError from "../error/apiError";
import logger from "./logger";

async function sendEmail(emailToSend: string[], subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    host: config.get("email.name"),
    port: config.get("email.port"),
    secure: false,
    auth: {
      user: config.get("email.username"),
      pass: config.get("email.password"),
    },
  });
  try {
    const info = await transporter.sendMail({
      from: config.get("email.username"),
      to: emailToSend,
      subject,
      text,
    });
    logger.info(
      `Email with this subject: ${subject} and messageId: ${info.messageId} was sent`,
    );
    return true;
  } catch (e) {
    logger.error(
      `Error during sending an email with this subject: ${subject}`,
      e,
    );
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
  }
}

export default sendEmail;
