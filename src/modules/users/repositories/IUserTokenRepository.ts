import { UserToken } from ".prisma/client";

import {
  CreateTokenDTO,
  FindByRefreshTokenAndUserIdDTO,
  FindByRefreshTokenUserIdAndIpDTO,
} from "./../dtos/TokenDTO";

export interface IUserTokenRepository {
  create(data: CreateTokenDTO): Promise<UserToken>;
  delete(id: string): Promise<void>;
  findByRefreshTokenAndUserId(
    data: FindByRefreshTokenAndUserIdDTO
  ): Promise<UserToken>;
  findByRefreshTokenUserIdAndIp(
    data: FindByRefreshTokenUserIdAndIpDTO
  ): Promise<UserToken>;
}
