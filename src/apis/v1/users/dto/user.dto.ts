import { Exclude, Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: string;

  @Exclude()
  username: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: string;

  @Exclude()
  password: string;

  @Expose()
  isActive: boolean;

  @Expose()
  isPhoneVerify: boolean;

  @Expose()
  isEmailVerify: boolean;

  @Expose()
  lastLogin: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
