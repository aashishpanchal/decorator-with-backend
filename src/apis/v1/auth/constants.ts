import settings from "@conf/settings";

// for passport js
export enum StrategyType {
  localAuth = "local",
  jwtAuth = "jwt-access",
}

// for tokens
export enum TokenType {
  refresh = "refresh",
  access = "access",
}

// messages
export const phoneOtpMeg = (otp: string) =>
  `Your ${settings.app.name} verification code is: ${otp}, valid in ${settings.otp.period}`;
