import express from "express";
import passport from "passport";
import apiRoute from "./apis/routes";
import bodyParser from "body-parser";
import { notFound, errors, morganMiddleware } from "./common/middlewares";
import type { Application } from "express";

export const app: Application = express();

// middlewares
app.use(morganMiddleware);
app.use(passport.initialize());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: false }));

// apis routes
app.use("/api", apiRoute);
// not found route
app.all("*", notFound);
// error handler middleware
app.use(errors);
