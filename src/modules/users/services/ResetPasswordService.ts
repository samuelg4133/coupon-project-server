import { PrismaResetPasswordTokenRepository } from "./../repositories/prisma/PrismaResetPasswordTokenRepository";
import { PrismaUserRepository } from "./../repositories/prisma/PrismaUserRepository";
import Service from "@shared/core/Service";
import { IResetPasswordTokenRepository } from "../repositories/IResetPasswordTokenRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import Error from "@shared/core/Error";
import { isBefore } from "date-fns";
import { hash } from "bcryptjs";

interface Request {
  password: string;
  token: string;
}

export class ResetPasswordService implements Service<Request, void> {
  private _userRepository: IUserRepository;
  private _userResetPasswrodTokenRepository: IResetPasswordTokenRepository;

  constructor() {
    this._userRepository = new PrismaUserRepository();
    this._userResetPasswrodTokenRepository =
      new PrismaResetPasswordTokenRepository();
  }

  public async execute({ password, token }: Request): Promise<void> {
    const userResetPasswordToken =
      await this._userResetPasswrodTokenRepository.findByToken(token);

    if (!userResetPasswordToken) {
      throw new Error({
        message: "User token does not exists.",
      });
    }

    if (isBefore(userResetPasswordToken.expiration, Date.now())) {
      throw new Error({ message: "Token Expired." });
    }

    const user = await this._userRepository.findById(
      userResetPasswordToken.userId
    );

    if (!user) {
      throw new Error({ message: "User does not exists." });
    }

    user.password = await hash(password, 8);

    await this._userRepository.update(user);
  }
}
