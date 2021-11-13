import { prisma } from "@shared/infra/prisma/client";
import { ResetPasswordToken } from ".prisma/client";
import { CreateResetPasswordTokenDTO } from "@modules/users/dtos/ResetPasswordTokenDTO";
import { IResetPasswordTokenRepository } from "./../IResetPasswordTokenRepository";

export class PrismaResetPasswordTokenRepository
  implements IResetPasswordTokenRepository
{
  public async create({
    expiration,
    userId,
  }: CreateResetPasswordTokenDTO): Promise<ResetPasswordToken> {
    const resetPasswordToken = await prisma.resetPasswordToken.create({
      data: {
        expiration,
        userId,
      },
    });

    return resetPasswordToken;
  }

  public async findByToken(token: string): Promise<ResetPasswordToken> {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: {
        token,
      },
    });

    return resetPasswordToken;
  }
}
