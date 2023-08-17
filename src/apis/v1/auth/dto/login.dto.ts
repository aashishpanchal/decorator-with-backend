import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "@apis/v1/users/dto";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto extends PickType(CreateUserDto, [
  "username",
  "password",
]) {
  @IsString()
  @IsNotEmpty()
  password: string;
}
