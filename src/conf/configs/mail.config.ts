import env from "@core/utils/env";

export function mailConfig() {
  return {
    host: env.getOrThrow<string>("MAIL_HOST"),
    port: env.int("MAIL_PORT", 587),
    user: env.getOrThrow("MAIL_USER"),
    pass: env.getOrThrow("MAIL_PASS"),
    from: env.getOrThrow("MAIL_FROM"),
  };
}
