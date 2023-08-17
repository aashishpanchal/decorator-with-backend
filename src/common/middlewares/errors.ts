import httpStatus from "http-status";
import settings from "@conf/settings";
import createHttpError from "http-errors";
import type { Request, Response, NextFunction } from "express";

export function errors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (createHttpError.isHttpError(error)) {
    res.status(error.statusCode).json({
      message: error.message,
      error: error.name,
      statusCode: error.statusCode,
    });
  } else {
    if (settings.app.isDev) {
      console.error("ERROR 💥", error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        error: error.name,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Something went wrong!`,
      error: "Internal server error",
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
