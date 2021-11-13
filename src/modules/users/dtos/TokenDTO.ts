export interface CreateTokenDTO {
  ip: string;
  token: string;
  refreshTokenExpiration: Date;
  userId: string;
}

export interface FindByRefreshTokenAndUserIdDTO {
  refreshToken: string;
  userId: string;
}

export interface FindByRefreshTokenUserIdAndIpDTO {
  ip: string;
  refreshToken: string;
  token: string;
  userId: string;
}
