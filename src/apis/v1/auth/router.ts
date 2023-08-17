import passport from "passport";
import { getRouterForClass } from "@core/curd";
import { StrategyType } from "./constants";
import { AuthController } from "./auth.controller";
import { jwtAuthStrategy, localStrategy } from "./strategies";

// set strategies
passport.use(StrategyType.localAuth, localStrategy);
passport.use(StrategyType.jwtAuth, jwtAuthStrategy);

// make auth router from class
const authRoute = getRouterForClass(AuthController);

export default authRoute;
