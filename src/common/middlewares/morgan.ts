import morgan from "morgan";
import settings from "@conf/settings";
import type { Response } from "express";

morgan.token("message", (_, res: Response) => res.locals.errorMessage || "");

const getIpFormat = () => (settings.app.isDev ? ":remote-addr - " : "");
const responseFormat = `[:date[web]] "${getIpFormat()}:method :url HTTP/:http-version" :status - :response-time ms`;

export const morganMiddleware = morgan(responseFormat, {
  stream: { write: (message) => console.info(message.trim()) },
});
