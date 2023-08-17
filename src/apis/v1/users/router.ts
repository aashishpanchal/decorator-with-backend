import { getRouterForClass } from "@core/curd";
import { UsersController } from "./users.controller";

const userRoute = getRouterForClass(UsersController);

export default userRoute;
