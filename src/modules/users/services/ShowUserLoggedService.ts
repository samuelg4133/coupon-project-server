import { PrismaUserRepository } from "./../repositories/prisma/PrismaUserRepository";
import { IUserRepository } from "./../repositories/IUserRepository";
import { User } from ".prisma/client";
import Service from "@shared/core/Service";
import Error from "@shared/core/Error";

interface Request {
  userId: string;
}

interface Response extends Omit<User, "password"> {}

export class ShowUserLoggedService implements Service<Request, Response> {
  private _userRepository: IUserRepository;

  constructor() {
    this._userRepository = new PrismaUserRepository();
  }

  async execute({ userId }: Request): Promise<Response> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new Error({
        message: "User not found",
        statusCode: 401,
      });
    }

    delete user.password;

    return user;
  }
}
