import env from "@core/utils/env";

export function twilioConfig() {
  return {
    accountSid: env.getOrThrow("TWILIO_ACCOUNT_SID"),
    authToken: env.getOrThrow("TWILIO_AUTH_TOKEN"),
    phoneNumber: env.getOrThrow("TWILIO_FROM_NUMBER"),
  };
}
