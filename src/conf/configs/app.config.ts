import env from "@core/utils/env";

export function appConfig() {
  const nodeEnv = env.oneOf<"dev" | "prod">("NODE_ENV", ["dev", "prod"], "dev");

  return {
    nodeEnv,
    isDev: nodeEnv === "dev",
    host: env("APP_HOST", "0.0.0.0"),
    port: env.int("APP_PORT", 3000),
    secret: env.getOrThrow("APP_SECRET"),
    name: env("APP_NAME", "CoderAashish"),
  };
}
