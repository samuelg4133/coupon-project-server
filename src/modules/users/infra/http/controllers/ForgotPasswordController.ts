import { SendForgotPasswordEmailService } from "@modules/users/services/SendForgotPasswordEmailService";
import { Request, Response } from "express";

export class ForgotPasswordController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPassword = new SendForgotPasswordEmailService();

    await forgotPassword.execute({
      email,
    });

    return response.status(204).json();
  }
}
