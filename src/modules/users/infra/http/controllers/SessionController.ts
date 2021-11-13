import { Request, Response } from "express";
import { AuthenticateUserService } from "@modules/users/services/AuthenticateUserService";
import { ShowUserLoggedService } from "@modules/users/services/ShowUserLoggedService";
import { RefreshTokenService } from "@modules/users/services/RefreshTokenService";
import { LogoutUserService } from "@modules/users/services/LogoutUserService";

export class SessionController {
  public async login(req: Request, res: Response) {
    const { login, password } = req.body;
    const authUser = new AuthenticateUserService();
    const { token, refreshToken } = await authUser.execute({
      ip: req.ip,
      login,
      password,
    });

    return res.json({
      token,
      refreshToken,
    });
  }

  public async me(req: Request, res: Response) {
    const { userId } = req;

    const showUser = new ShowUserLoggedService();

    const user = await showUser.execute({ userId });

    return res.json(user);
  }

  public async logout(req: Request, res: Response) {
    const { userId } = req;
    const { refresh_token } = req.body;

    const logout = new LogoutUserService();

    await logout.execute({ refreshToken: refresh_token, userId });

    return res.send({});
  }

  public async refresh(req: Request, res: Response) {
    const { ip, userId } = req;
    const { refresh_token } = req.body;
    const { authorization } = req.headers;

    const [, oldToken] = authorization?.split(" ");

    const refreshTokenService = new RefreshTokenService();

    const { refreshToken, token } = await refreshTokenService.execute({
      ip,
      refreshToken: refresh_token,
      userId,
      oldToken,
    });

    return res.json({
      token,
      refreshToken,
    });
  }
}
