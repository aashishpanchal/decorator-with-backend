import { RequestHandler } from "express";

// warp express async function
const catchErrorAsync =
  (fn: Function) =>
  (...args: any[]) => {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };

export const catchAsync = (fn: RequestHandler) => catchErrorAsync(fn);
