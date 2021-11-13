import { compare } from "bcryptjs";
import { addDays } from "date-fns";
import jwt from "jsonwebtoken";

import Service from "@shared/core/Service";
import auth from "@config/auth";
import Error from "@shared/core/Error";

import { PrismaUserRepository } from "./../repositories/prisma/PrismaUserRepository";
import { IUserRepository } from "./../repositories/IUserRepository";
import { PrismaUserTokenRepository } from "./../repositories/prisma/PrismaUserTokenRepository";
import { IUserTokenRepository } from "./../repositories/IUserTokenRepository";

interface Request {
  login: string;
  password: string;
  ip: string;
}

interface Response {
  token: string;
  refreshToken: string;
}

export class AuthenticateUserService implements Service<Request, Response> {
  private _userTokenRepository: IUserTokenRepository;
  private _userRepository: IUserRepository;
  constructor() {
    this._userRepository = new PrismaUserRepository();
    this._userTokenRepository = new PrismaUserTokenRepository();
  }

  async execute({ ip, login, password }: Request): Promise<Response> {
    const user = await this._userRepository.findByLogin(login.toLowerCase());

    if (!user) {
      throw new Error({
        message: "Incorrect login/password combination.",
        statusCode: 401,
      });
    }

    if (!user.isActive) {
      throw new Error({
        message: "User is not active.",
        statusCode: 401,
      });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error({
        message: "Incorrect login/password combination.",
        statusCode: 401,
      });
    }

    const token = jwt.sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    const { refreshToken } = await this._userTokenRepository.create({
      ip,
      refreshTokenExpiration: addDays(new Date(), 1),
      userId: user.id,
      token,
    });

    return {
      refreshToken: refreshToken,
      token,
    };
  }
}
