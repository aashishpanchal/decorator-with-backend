import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "@apis/v1/users/dto";

export class RegisterDto extends PickType(CreateUserDto, [
  "username",
  "email",
  "phone",
  "firstName",
  "lastName",
  "password",
]) {}
