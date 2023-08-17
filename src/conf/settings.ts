import { appConfig } from "./configs/app.config";
import { dbConfig } from "./configs/db.config";
import { jwtConfig } from "./configs/jwt.config";
import { mailConfig } from "./configs/mail.config";
import { twilioConfig } from "./configs/twilio.config";

function settings() {
  const app = appConfig();

  // server settings
  return {
    // app settings
    app,
    // db settings
    db: dbConfig(),
    // jwt settings
    jwt: jwtConfig(app),
    // mail settings
    mail: mailConfig(),
    // otp settings
    otp: { digits: 6, period: "2m", algorithm: "sha256" },
    // twilio settings
    twilio: twilioConfig(),
  };
}

export default settings();
