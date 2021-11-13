import { addHours } from "date-fns";
import path from "path";

import Error from "@shared/core/Error";
import Service from "@shared/core/Service";

import { IMailProvider } from "@shared/infra/providers/MailProvider/models/IMailProvider";
import { SESMailProvider } from "./../../../shared/infra/providers/MailProvider/implementations/SESMailProvider";

import { PrismaResetPasswordTokenRepository } from "./../repositories/prisma/PrismaResetPasswordTokenRepository";
import { IResetPasswordTokenRepository } from "./../repositories/IResetPasswordTokenRepository";
import { PrismaUserRepository } from "./../repositories/prisma/PrismaUserRepository";
import { IUserRepository } from "./../repositories/IUserRepository";

interface Request {
  email: string;
}

export class SendForgotPasswordEmailService implements Service<Request, void> {
  private _mailProvider: IMailProvider;
  private _resetPasswdTokenRepository: IResetPasswordTokenRepository;
  private _userRepository: IUserRepository;

  constructor() {
    this._mailProvider = new SESMailProvider();
    this._resetPasswdTokenRepository = new PrismaResetPasswordTokenRepository();
    this._userRepository = new PrismaUserRepository();
  }
  public async execute({ email }: Request): Promise<void> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new Error({
        message: "User not found.",
      });
    }

    const { token } = await this._resetPasswdTokenRepository.create({
      userId: user.id,
      expiration: addHours(Date.now(), 1),
    });

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );

    await this._mailProvider.send({
      to: {
        name: user.login,
        address: user.email,
      },
      subject: "Recuperação de Senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.login,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });

    console.log(token);
  }
}
