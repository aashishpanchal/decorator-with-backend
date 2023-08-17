import { join } from "node:path";
import nodemailer from "nodemailer";
import settings from "@conf/settings";
import createHttpError from "http-errors";
import { compileTemplate } from "./tem-compiler";
import type { SendMailOptions } from "nodemailer";

// interface and types
interface ISendMailOptions extends SendMailOptions {
  context?: Record<string, any>;
  template?: string;
}

// create transporter instance
const transporter = nodemailer.createTransport({
  host: settings.mail.host,
  port: settings.mail.port,
  auth: {
    user: settings.mail.user,
    pass: settings.mail.pass,
  },
  from: settings.mail.from,
});

// compiler
transporter.use("compile", async (mail, callback) => {
  const { template } = mail.data as any;

  // if template is not empty, use the template to compile ejs template
  if (template)
    return await compileTemplate(mail, callback, {
      dir: join(process.cwd(), "views"),
    });

  return callback();
});

export async function sendMail(sendMailOptions: ISendMailOptions) {
  const verify = await transporter.verify();

  // check connection configuration
  if (!verify) {
    throw new createHttpError.InternalServerError(
      "Failed to connect to mail server"
    );
  }

  // after send mail, return the result
  return await transporter.sendMail(sendMailOptions);
}
