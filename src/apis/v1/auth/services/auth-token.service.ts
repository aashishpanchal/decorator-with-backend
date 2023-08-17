import { Token } from "../helpers";
import { TokenType } from "../constants";
import settings from "@conf/settings";

class AccessToken extends Token {
  save = false;
  exp = settings.jwt.accessExp;
  tokenType = TokenType.access;
}

class RefreshToken extends Token {
  save = true;
  exp = settings.jwt.refreshExp;
  tokenType = TokenType.refresh;

  // create access token instance
  access = new AccessToken();
}

// create instance of refresh token class
export const refreshToken = new RefreshToken();
