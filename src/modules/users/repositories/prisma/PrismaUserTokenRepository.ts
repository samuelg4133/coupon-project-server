import { UserToken } from ".prisma/client";
import {
  CreateTokenDTO,
  FindByRefreshTokenAndUserIdDTO,
  FindByRefreshTokenUserIdAndIpDTO,
} from "@modules/users/dtos/TokenDTO";
import { prisma } from "@shared/infra/prisma/client";
import { IUserTokenRepository } from "../IUserTokenRepository";

export class PrismaUserTokenRepository implements IUserTokenRepository {
  async create({
    ip,
    refreshTokenExpiration,
    token,
    userId,
  }: CreateTokenDTO): Promise<UserToken> {
    const userToken = await prisma.userToken.create({
      data: {
        ip,
        userId,
        expiration: refreshTokenExpiration,
        token,
      },
    });

    return userToken;
  }

  async delete(id: string): Promise<void> {
    await prisma.userToken.delete({
      where: {
        id,
      },
    });
  }

  async findByRefreshTokenAndUserId({
    refreshToken,
    userId,
  }: FindByRefreshTokenAndUserIdDTO): Promise<UserToken> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        AND: {
          refreshToken,
          userId,
        },
      },
    });

    return userToken;
  }

  async findByRefreshTokenUserIdAndIp({
    ip,
    refreshToken,
    token,
    userId,
  }: FindByRefreshTokenUserIdAndIpDTO): Promise<UserToken> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        ip,
        refreshToken,
        userId,
        token,
      },
    });

    return userToken;
  }
}
