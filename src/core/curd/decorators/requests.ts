import { IRoute } from "express";

// Decorator factory for common HTTP methods
const createCommonDecorator =
  (method: keyof IRoute) =>
  (path: string | string[] = "/") => {
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) => {
      if (!target.constructor.routes) {
        target.constructor.routes = [];
      }

      target.constructor.routes.push({
        method,
        path: path || [],
        methodName: propertyKey, // Use the method name instead of descriptor.value
      });
    };
  };

// Decorator functions for specific HTTP methods
export const post = createCommonDecorator("post");
export const get = createCommonDecorator("get");
export const all = createCommonDecorator("all");
export const put = createCommonDecorator("put");
export const del = createCommonDecorator("delete");
export const patch = createCommonDecorator("patch");
