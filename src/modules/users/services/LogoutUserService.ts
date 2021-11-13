import Error from "@shared/core/Error";
import Service from "@shared/core/Service";

import { IUserTokenRepository } from "../repositories/IUserTokenRepository";
import { PrismaUserTokenRepository } from "../repositories/prisma/PrismaUserTokenRepository";

interface Request {
  refreshToken: string;
  userId: string;
}

export class LogoutUserService implements Service<Request, void> {
  private _userTokenRepository: IUserTokenRepository;

  constructor() {
    this._userTokenRepository = new PrismaUserTokenRepository();
  }
  async execute({ refreshToken, userId }: Request): Promise<void> {
    const userToken =
      await this._userTokenRepository.findByRefreshTokenAndUserId({
        refreshToken,
        userId,
      });

    if (!userToken) {
      throw new Error({
        message: "Refresh Token does not exists.",
        statusCode: 400,
      });
    }

    await this._userTokenRepository.delete(userToken.id);
  }
}
