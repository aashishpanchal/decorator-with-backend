import { UserDto } from "./dto";
import { UserDocument } from "@/models";
import { serializer } from "@core/utils";

export const userSerializer = (user: UserDocument) =>
  serializer(UserDto, user.toJSON());
