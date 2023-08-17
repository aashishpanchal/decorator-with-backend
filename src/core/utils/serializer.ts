import { ClassConstructor, plainToInstance } from "class-transformer";

// serializer function
export function serializer<T>(cls: ClassConstructor<T>, instance: T) {
  return plainToInstance(cls, instance, {
    excludeExtraneousValues: true,
  });
}
