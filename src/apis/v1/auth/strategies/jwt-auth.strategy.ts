import { UserModel } from "@/models";
import settings from "@conf/settings";
import createHttpError from "http-errors";
import { Strategy, ExtractJwt } from "passport-jwt";

export const jwtAuthStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: settings.jwt.secret,
  },
  async (payload, done) => {
    try {
      const { sub } = payload;

      if (!sub)
        throw new createHttpError.BadRequest(
          "Token contained no recognizable user identification"
        );

      const user = await UserModel.findOne({ _id: sub });

      if (!user.isActive)
        throw new createHttpError.Forbidden("User is inactive");

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
