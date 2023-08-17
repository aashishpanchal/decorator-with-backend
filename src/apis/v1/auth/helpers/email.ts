import settings from "@/conf/settings";
import { sendMail } from "@/common/mail";
import { UserDocument } from "@/models";

export async function sendVerifyEmail(user: UserDocument, code: string) {
  // subject of email
  const subject = `${code} is your ${settings.app.name} account verify email`;
  // context of email template
  const context = {
    code,
    username: user.username,
    appName: settings.app.name,
  };
  // final send email
  return await sendMail({
    to: user.email,
    subject,
    context,
    template: "emails/verify-email",
  });
}

export async function sendResetPasswordEmail(user: UserDocument, code: string) {
  // subject of email
  const subject = `${code} is your ${settings.app.name} account reset password`;
  // context of email template
  const context = {
    code,
    username: user.username,
    appName: settings.app.name,
  };
  // final send email
  return await sendMail({
    to: user.email,
    subject,
    context,
    template: "emails/reset-password",
  });
}
