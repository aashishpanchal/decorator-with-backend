declare namespace Controller {
  export type RouteMetadata = {
    method: keyof IRoute;
    path: string | string[];
    methodName: string;
  };
}
