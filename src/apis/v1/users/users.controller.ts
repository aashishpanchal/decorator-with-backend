import httpStatus from "http-status";
import { Role } from "@/models";
import { http } from "@core/curd";
import { valid } from "@/common/decorators";
import { Request, Response } from "express";
import { roleGuard } from "./guard";
import { jwtAuth } from "../auth/passport";
import { userSerializer } from "./serializers";
import { CreateUserDto, UpdateUserDto } from "./dto";

@http.middle(jwtAuth)
export class UsersController {
  @http.get("/me")
  getMe(req: Request, res: Response) {
    res.status(httpStatus.OK).json(userSerializer(req.user));
  }

  @http.put("/me")
  @valid.body(UpdateUserDto)
  updateMe(req: Request, res: Response) {
    res.status(httpStatus.OK).json(req.body);
  }

  @http.patch("/me/change-email")
  changeEmail(req: Request, res: Response) {
    res.status(httpStatus.OK).json(req.body);
  }

  @http.post()
  @valid.body(CreateUserDto)
  @http.guard(roleGuard(Role.ADMIN))
  create(req: Request, res: Response) {
    res.status(httpStatus.CREATED).json(req.body);
  }

  @http.put()
  @valid.body(UpdateUserDto)
  @http.guard(roleGuard(Role.ADMIN))
  update(req: Request, res: Response) {
    res.status(httpStatus.OK).json(req.body);
  }

  @http.get()
  @http.guard(roleGuard(Role.ADMIN))
  list(req: Request, res: Response) {
    res.status(httpStatus.OK).json([]);
  }

  @http.get("/:id")
  @http.guard(roleGuard(Role.ADMIN))
  retrieve(req: Request, res: Response) {
    res.status(httpStatus.OK).json({});
  }

  @http.del("/:id")
  @http.guard(roleGuard(Role.ADMIN, Role.USER))
  remove(req: Request, res: Response) {
    res.status(httpStatus.OK).json({});
  }
}
