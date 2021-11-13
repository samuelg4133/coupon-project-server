import { addDays, isBefore } from "date-fns";
import jwt from "jsonwebtoken";
import { PrismaUserTokenRepository } from "./../repositories/prisma/PrismaUserTokenRepository";
import { IUserTokenRepository } from "./../repositories/IUserTokenRepository";
import Service from "@shared/core/Service";
import Error from "@shared/core/Error";
import auth from "@config/auth";

interface Request {
  refreshToken: string;
  oldToken: string;
  ip: string;
  userId: string;
}

interface Response {
  token: string;
  refreshToken: string;
}

export class RefreshTokenService implements Service<Request, Response> {
  private _userTokenRepository: IUserTokenRepository;

  constructor() {
    this._userTokenRepository = new PrismaUserTokenRepository();
  }

  async execute({
    ip,
    oldToken,
    refreshToken,
    userId,
  }: Request): Promise<Response> {
    const userToken =
      await this._userTokenRepository.findByRefreshTokenUserIdAndIp({
        ip,
        token: oldToken,
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

    if (isBefore(userToken.expiration, Date.now())) {
      throw new Error({
        message: "Refresh Token is expired.",
      });
    }

    const token = jwt.sign({}, auth.jwt.secret, {
      subject: userToken.userId,
      expiresIn: auth.jwt.expiresIn,
    });

    const data = await this._userTokenRepository.create({
      ip,
      refreshTokenExpiration: addDays(Date.now(), 1),
      userId: userToken.userId,
      token,
    });

    return {
      refreshToken: data.refreshToken,
      token,
    };
  }
}
