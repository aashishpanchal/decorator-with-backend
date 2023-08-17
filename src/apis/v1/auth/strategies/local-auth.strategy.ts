import { Strategy } from "passport-local";
import { authService } from "../services";

export const localStrategy = new Strategy(
  async (username: string, password: string, done) => {
    try {
      const user = await authService.auth(username, password);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);
