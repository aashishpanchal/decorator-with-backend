import { Router } from "express";
import authRoute from "./v1/auth/router";
import userRoute from "./v1/users/router";

const apiRoute: Router = Router();

apiRoute.use("/auth", authRoute);
apiRoute.use("/users", userRoute);

export default apiRoute;
