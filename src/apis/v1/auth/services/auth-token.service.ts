import { Token } from "../helpers";
import { TokenType } from "../constants";
import settings from "@conf/settings";

// access token to help to access the protected routes
class AccessToken extends Token {
  save = false;
  exp = settings.jwt.accessExp;
  tokenType = TokenType.access;
}

// refresh token to help to refresh the access token
class RefreshToken extends Token {
  save = true;
  exp = settings.jwt.refreshExp;
  tokenType = TokenType.refresh;

  // create access token instance
  access = new AccessToken();
}

// create instance of refresh token class
export const refreshToken = new RefreshToken();
