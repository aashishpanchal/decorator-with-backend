import { catchAsync } from "../utils";
import { RequestHandler, Router } from "express";

// this is function help to extract all request handler from class controller
export function getRouterForClass<T extends { new (): any }>(cls: T) {
  const instance = new cls();

  const routes: Controller.RouteMetadata[] = instance.constructor.routes || [];
  const globalMiddlewares: RequestHandler[] =
    instance.constructor.globalMiddlewares || [];

  // express router
  const router: Router = Router();

  routes.forEach((route) => {
    const { method, path, methodName } = route as any;

    const handler = instance[methodName];

    // methods level middleware
    const { middlewares = [] } = handler;

    // marge global middleware and methods level middleware
    const allMiddlewares = [...globalMiddlewares, ...middlewares];

    // if path is array
    if (Array.isArray(path)) {
      // add method to router
      path.forEach((p) => {
        (router.route(p) as any)[method](
          ...allMiddlewares,
          catchAsync(handler.bind(instance))
        );
      });
    } else {
      (router.route(path) as any)[method](
        ...allMiddlewares,
        catchAsync(handler.bind(instance))
      );
    }
  });

  return router;
}
