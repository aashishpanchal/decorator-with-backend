import ms from "ms";
import crypto from "node:crypto";
import settings from "@conf/settings";

class AuthOtp {
  private issuer: string = settings.app.name;
  private digits: number = settings.otp.digits;
  private period: number = ms(settings.otp.period);
  private algorithm: string = settings.otp.algorithm;
  private secrete: string = settings.app.secret;

  private getOtp() {
    const digits = this.digits;
    const otp = crypto.randomInt(10 ** digits);
    return otp;
  }

  createOtp(username: string) {
    const ttl = this.period * 1000; // converted to milliseconds
    const expires = Date.now() + ttl; // timestamp when the token will expire
    const otp = this.getOtp(); // generate OTP

    const data = `${username}:${otp}:${this.issuer}:${expires}`;

    const hashBase = crypto
      .createHmac(this.algorithm, this.secrete)
      .update(data)
      .digest("hex");

    return { otp, hash: `${hashBase}.${expires}` };
  }

  verifyOtp(username: string, otp: string, hash: string) {
    if (!hash.match(".")) return false; // hash should have at least one dot

    // separate hash and timestamp
    const [hashBase, expires] = hash.split(".");

    const exp = Number(expires);

    if (isNaN(exp)) return false;

    // Check if expiry time has passed
    let now = Date.now();
    if (now > exp) return false;

    // calculate new hash with the same key and the same algorithm
    const data = `${username}:${otp}:${this.issuer}:${expires}`;
    const newHash = crypto
      .createHmac(this.algorithm, this.secrete)
      .update(data)
      .digest("hex");
    // match the hashes
    if (newHash === hashBase) return true;

    return false;
  }
}

export const authOtp = new AuthOtp();
