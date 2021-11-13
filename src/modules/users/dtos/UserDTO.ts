import { User } from "@prisma/client";

export interface CreateUserDTO {
  login: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO extends Omit<User, "createdAt" | "updatedAt"> {}
