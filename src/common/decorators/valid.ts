import { validate } from "../middlewares";
import { middle } from "@core/curd/decorators";
import { ClassConstructor } from "class-transformer";

export const body = <T>(metaType: ClassConstructor<T>, groups?: string[]) =>
  middle(validate(metaType, "body", { groups }));

export const query = <T>(metaType: ClassConstructor<T>, groups?: string[]) =>
  middle(validate(metaType, "query", { groups }));

export const params = <T>(metaType: ClassConstructor<T>, groups?: string[]) =>
  middle(validate(metaType, "params", { groups }));
