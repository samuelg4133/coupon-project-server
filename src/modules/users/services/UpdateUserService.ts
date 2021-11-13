import { User } from ".prisma/client";
import Error from "@shared/core/Error";
import Service from "@shared/core/Service";
import { compare, hash } from "bcryptjs";
import { IUserRepository } from "../repositories/IUserRepository";
import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository";

interface Request extends Pick<User, "id" | "email" | "login"> {
  oldPassword?: string;
  password?: string;
}

export class UpdateUserService
  implements Service<Request, Omit<User, "password">>
{
  private _userRepository: IUserRepository;

  constructor(userRepository?: IUserRepository) {
    this._userRepository = userRepository ?? new PrismaUserRepository();
  }
  async execute({
    email,
    id,
    login,
    password,
    oldPassword,
  }: Request): Promise<Omit<User, "password">> {
    const user = await this._userRepository.findById(id);

    if (!user) {
      throw new Error({
        message: "User not found.",
      });
    }

    const userEmail = await this._userRepository.findByEmail(email);

    if (userEmail && userEmail.id !== user.id) {
      throw new Error({ message: "E-mail already used." });
    }

    const userLogin = await this._userRepository.findByLogin(login);

    if (userLogin && userLogin.id !== user.id) {
      throw new Error({ message: "Login already used." });
    }

    user.login = login.toLowerCase();
    user.email = email.toLowerCase();

    if (password && !oldPassword) {
      throw new Error({
        message: "You need to inform the old password to set a new password",
      });
    }

    if (password && oldPassword) {
      const oldPasswordMatched = await compare(oldPassword, user.password);

      if (!oldPasswordMatched) {
        throw new Error({
          message: "Incorrect old password.",
          statusCode: 401,
        });
      }

      if (password === oldPassword) {
        throw new Error({
          message: "The new password must be different of the old password.",
        });
      }

      user.password = await hash(password, 8);
    }

    await this._userRepository.update(user);

    delete user.password;

    return user;
  }
}
