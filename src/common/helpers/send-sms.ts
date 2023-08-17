import * as fs from "fs";
import twilio from "twilio";
import { join } from "node:path";
import { v4 as uuid4 } from "uuid";
import settings from "@conf/settings";

const client = twilio(settings.twilio.accountSid, settings.twilio.authToken);

function saveMessage(message: string, phone: string) {
  const id = uuid4().replace(/-/g, "");

  const path = join(process.cwd(), `log/sms`);

  // check file exit or not and create
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  fs.writeFileSync(
    join(path, `${id}.log`),
    `[${new Date().toLocaleString()}] ${phone}\n${message}`
  );
}

export const sendSms = async (phone: string, message: string) => {
  if (!settings.app.isDev) {
    // send message phone
    return await client.messages.create({
      to: phone,
      body: message,
      from: settings.twilio.phoneNumber,
    });
  } else {
    // save otp in file log
    saveMessage(message, phone);
  }
};
