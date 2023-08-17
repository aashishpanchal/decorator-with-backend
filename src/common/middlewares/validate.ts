import httpStatus from "http-status";
import { catchAsync } from "@core/utils/catchAsync";
import {
  type ValidationError,
  type ValidatorOptions,
  validate as classValidate,
} from "class-validator";
import { type ClassConstructor, plainToClass } from "class-transformer";

function customErrorFormat(errors: ValidationError[]) {
  if (errors.length > 0) {
    const validFormat = errors.map((item) => {
      if (item.children.length > 0) {
        return {
          field: item.property,
          child: customErrorFormat(item.children),
        };
      }
      return {
        field: item.property,
        errors: Object.values(item.constraints),
      };
    });
    return validFormat;
  }
  return errors;
}

export function validate<T>(
  metaType: ClassConstructor<T>,
  k: "body" | "query" | "params" = "body",
  validatorOptions?: ValidatorOptions
) {
  return catchAsync(async (req, res, next) => {
    const data = plainToClass(metaType, req[k], {
      enableImplicitConversion: true,
    });

    const validationErrors = await classValidate(data as any, {
      always: true,
      whitelist: true,
      forbidUnknownValues: false,
      ...validatorOptions,
    });

    if (validationErrors.length > 0)
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: customErrorFormat(validationErrors),
      });

    req.body = data;

    next();
  });
}
