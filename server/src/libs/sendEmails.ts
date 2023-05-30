import config from "config";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import ApiError from "../error/apiError";
import logger from "./logger";

async function sendEmail(code: string, emailToSend: string) {
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
      subject: "Verification Code Travel App",
      text: `Verification Code: ${code}`,
    });
    logger.info("Message with verification code sent", info.messageId);
    return true;
  } catch (e) {
    logger.error("Error during sent message with verification code", e);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
  }
}

export default sendEmail;
