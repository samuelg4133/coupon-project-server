import { CreateResetPasswordTokenDTO } from "./../dtos/ResetPasswordTokenDTO";
import { ResetPasswordToken } from "@prisma/client";

export interface IResetPasswordTokenRepository {
  create(data: CreateResetPasswordTokenDTO): Promise<ResetPasswordToken>;
  findByToken(token: string): Promise<ResetPasswordToken>;
}
