import createHttpError from "http-errors";
import type { NextFunction, Request, RequestHandler, Response } from "express";

// class and method level middleware decorator
export function middle(...middlewares: RequestHandler[]) {
  return (...args: any) => {
    // class level middleware
    if (args.length === 1) {
      const [constructor] = args;
      // set array of middlewares globally
      if (!constructor.globalMiddlewares) {
        constructor.globalMiddlewares = [];
      }

      // set middleware globally
      constructor.globalMiddlewares.push(...middlewares);
    } else {
      // method level middleware
      const [target, propertyKey, descriptor] = args;
      if (!descriptor.value.middlewares) {
        descriptor.value.middlewares = [];
      }
      descriptor.value.middlewares.push(...middlewares);
    }
  };
}

// auth middleware decorator
export const guard = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<boolean>
) => {
  return middle(async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      if (!result) throw new createHttpError.Forbidden();
      next();
    } catch (error) {
      next(error);
    }
  });
};
