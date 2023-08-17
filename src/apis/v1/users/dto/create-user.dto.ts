import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import { Role } from "@models/role.enum";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsMobilePhone(
    "en-IN",
    { strictMode: true },
    { message: "Please enter valid phone number." }
  )
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/[a-z]/, {
    message: "Password must contain at least one lowercase character",
  })
  @Matches(/[A-Z]/, {
    message: "Password must contain at least one uppercase character",
  })
  @Matches(/\d/, { message: "Password must contain at least one number" })
  password: string;

  @IsString()
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
  isPhoneVerify: boolean;

  @IsBoolean()
  @IsOptional()
  isEmailVerify: boolean;
}
