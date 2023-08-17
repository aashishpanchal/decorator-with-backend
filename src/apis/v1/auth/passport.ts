import passport from "passport";
import { StrategyType } from "./constants";

const options = {
  session: false,
};

// jwt auth middlewares
export const jwtAuth = passport.authenticate(StrategyType.jwtAuth, options);

// local auth middlewares
export const localAuth = passport.authenticate(StrategyType.localAuth, options);
