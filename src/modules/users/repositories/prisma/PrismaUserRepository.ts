import { CreateUserDTO, UpdateUserDTO } from "@modules/users/dtos/UserDTO";
import { prisma } from "@shared/infra/prisma/client";
import { IUserRepository } from "./../IUserRepository";
import { User } from ".prisma/client";

export class PrismaUserRepository implements IUserRepository {
  async update({
    id,
    email,
    isActive,
    login,
    password,
  }: UpdateUserDTO): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        isActive,
        login,
        password,
      },
    });

    return user;
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  async findByLogin(login: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        login,
      },
    });

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async create({ email, login, password }: CreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data: {
        email,
        login,
        password,
      },
    });
  }
}
