import { Role } from "@/models";
import { Request } from "express";

// role guard check role of user
export const roleGuard =
  (...roles: Role[]) =>
  async (req: Request) => {
    if (!roles) {
      return true;
    }

    const user = req.user;

    if (!user) {
      return false;
    }

    return user && roles.includes(user.role);
  };
