import env from "@core/utils/env";

export function jwtConfig(app: any) {
  return {
    issuer: env("JWT_ISSUER", app.name),
    secret: env("JWT_SECRET", app.secret),
    accessExp: env.getOrThrow("JWT_ACCESS_EXP"),
    refreshExp: env.getOrThrow("JWT_REFRESH_EXP"),
  };
}
