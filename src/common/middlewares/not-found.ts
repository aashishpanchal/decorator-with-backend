import { Request } from "express";
import createHttpError from "http-errors";

export function notFound(req: Request) {
  throw createHttpError.NotFound(`Cannot ${req.method} ${req.originalUrl}`);
}
