import { http } from "@core/curd";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { valid } from "@/common/decorators";
import { verifyToken } from "./helpers";
import { authService } from "./services";
import { RegisterDto, TokenDto } from "./dto";
import { jwtAuth, localAuth } from "./passport";

// auth controller
export class AuthController {
  @http.post("/login")
  @http.middle(localAuth)
  async login(req: Request, res: Response) {
    const tokens = await authService.getTokens(req.user);
    res.status(httpStatus.OK).json(tokens);
  }

  @http.post("/register")
  @valid.body(RegisterDto)
  async register(req: Request, res: Response) {
    const user = await authService.register(req.body);
    res.status(httpStatus.OK).json(user);
  }

  @valid.body(TokenDto)
  @http.post("/verify-token")
  async verifyToken(req: Request, res: Response) {
    await verifyToken(req.body["token"]);
    res.status(httpStatus.OK).json({ message: "Token is valid" });
  }

  @valid.body(TokenDto)
  @http.post("/refresh-token")
  async refresh(req: Request, res: Response) {
    const tokens = await authService.refreshToken(req.body["token"] || "");
    res.status(httpStatus.OK).json(tokens);
  }

  @http.del("/logout")
  @valid.body(TokenDto)
  @http.middle(jwtAuth)
  async logout(req: Request, res: Response) {
    const result = await authService.logout(req.body["token"] || "");
    res.status(httpStatus.OK).json(result);
  }
}
