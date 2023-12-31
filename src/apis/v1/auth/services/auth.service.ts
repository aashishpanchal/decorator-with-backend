import createHttpError from "http-errors";
import { RegisterDto } from "../dto";
import { TokenType, Messages } from "../constants";
import { refreshToken } from "./auth-token.service";
import { UserDocument, UserModel } from "@/models";

class AuthService {
  async auth(username: string, password: string) {
    const user = await UserModel.findOne({ username }, "+password");

    if (!user) throw createHttpError.NotFound(Messages.userAccountNotFound);

    if (!(await user.checkPassword(password)))
      throw createHttpError.Unauthorized(Messages.invalidCredentials);

    return await user.updateLastLogin();
  }

  async register(registerDto: RegisterDto) {
    const { username } = registerDto;

    const user = await UserModel.findOne({ username });

    if (user) throw createHttpError.Conflict(Messages.userAccountAlreadyExists);

    const newUser = await UserModel.create(registerDto);

    return newUser;
  }

  async getTokens(user: UserDocument) {
    const [rt, at] = await Promise.all([
      refreshToken.getToken(user),
      refreshToken.access.getToken(user),
    ]);

    return {
      [TokenType.access]: at,
      [TokenType.refresh]: rt,
    };
  }

  async refreshToken(token: string) {
    const payload = await refreshToken.verify(token);

    const { sub } = payload;

    // get user by id and update last login
    const user = await (await UserModel.findById(sub))?.updateLastLogin();

    if (!user) throw new createHttpError.Unauthorized(Messages.tokenSubInvalid);

    // gen new access tokens
    return {
      access: await refreshToken.access.getToken(user),
    };
  }

  async logout(token: string) {
    const payload = await refreshToken.verify(token);

    const { jti } = payload;

    // save refresh token in black list
    await refreshToken.tokenBlackList(jti);

    return { message: "logout successfully" };
  }
}

export const authService = new AuthService();
