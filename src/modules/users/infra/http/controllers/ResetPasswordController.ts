import { ResetPasswordService } from "@modules/users/services/ResetPasswordService";
import { Request, Response } from "express";

export class ResetPasswordController {
  public async store(request: Request, response: Response) {
    const { token, password } = request.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
