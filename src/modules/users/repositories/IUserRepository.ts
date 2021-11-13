import { User } from ".prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "./../dtos/UserDTO";

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
  update(user: UpdateUserDTO): Promise<User>;
}
