import { User } from ".prisma/client";
import Error from "@shared/core/Error";
import { hash } from "bcryptjs";
import { IUserRepository } from "../repositories/IUserRepository";
import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository";

interface Request {
  email: string;
  login: string;
  password: string;
}

export class CreateUserService {
  private _userRepository: IUserRepository;

  constructor(userRepository?: IUserRepository) {
    this._userRepository = userRepository ?? new PrismaUserRepository();
  }

  async execute({
    email,
    login,
    password,
  }: Request): Promise<Omit<User, "password">> {
    const findUserByEmail = await this._userRepository.findByEmail(email);
    if (findUserByEmail) {
      throw new Error({
        message: "Email already used.",
      });
    }

    const findUserByLogin = await this._userRepository.findByLogin(login);
    if (findUserByLogin) {
      throw new Error({
        message: "Login already used.",
      });
    }

    const hashedPassword = await hash(password, 8);

    const user = await this._userRepository.create({
      email: email.toLowerCase(),
      login: login.toLowerCase(),
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }
}
