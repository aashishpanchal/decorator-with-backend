import ms from "ms";
import { v4 as uuid4 } from "uuid";
import settings from "@conf/settings";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BlackListModel, UserDocument } from "@/models";

export abstract class Token {
  protected abstract save: boolean;
  protected abstract exp: string;
  protected abstract tokenType: string;

  private issuer = settings.jwt.issuer;
  private secretKey = settings.jwt.secret;

  async checkTokenBlackList(jti: string) {
    const blacklistToken = await BlackListModel.findOne({ jti });

    if (blacklistToken?.isBlackListed)
      throw new createHttpError.Unauthorized("Token is blacklisted");
  }

  private async addToken(options: {
    user: UserDocument;
    jti: string;
    token: string;
  }) {
    const { user, jti, token } = options;

    return await BlackListModel.create({
      user,
      jti,
      exp: new Date(ms(this.exp) + Date.now()),
      token,
    });
  }

  async tokenBlackList(jti: string) {
    // Ensure outstanding token exists with given jti
    const blacklistedToken = await BlackListModel.findOneAndUpdate(
      { jti },
      { isBlackListed: true },
      { new: true }
    );

    return blacklistedToken;
  }

  // create token payload
  private getPayload(user: UserDocument): JwtPayload {
    // claims
    const userId = user.id;

    // user payload
    const payload: JwtPayload = {
      sub: userId,
      jti: uuid4().replaceAll("-", ""),
      iss: this.issuer,
    };

    if (this.tokenType) payload.type = this.tokenType;

    return payload;
  }

  // get token without save in database
  async getToken(user: UserDocument) {
    // payload
    const payload = this.getPayload(user);

    // create token by payload
    const token = jwt.sign(payload, this.secretKey, {
      expiresIn: this.exp,
    });

    // after save token information in db
    if (this.save) {
      await this.addToken({
        jti: payload.jti,
        token,
        user,
      });
    }

    // return token
    return token;
  }

  async verify(token: string) {
    try {
      const payload = jwt.verify(token, this.secretKey) as JwtPayload;
      // check token type valid or not
      if (payload.type !== this.tokenType)
        throw new createHttpError.Unauthorized("Invalid token type");

      if (this.save)
        // check token is in black list or not
        await this.checkTokenBlackList(payload.jti);

      return payload;
    } catch (error) {
      throw new createHttpError.BadRequest("Token is invalid or expired");
    }
  }
}
