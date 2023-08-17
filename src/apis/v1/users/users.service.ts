import { UserModel } from "@/models";
import { CreateUserDto, UpdateUserDto } from "./dto";

class UsersService {
  async crate(createUserDto: CreateUserDto) {}
  async update(id: string, updateDto: UpdateUserDto) {}
  async findOne(id: string) {}
  async delete(id: string) {}
}

export const userService = new UsersService();
