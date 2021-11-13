import { SES } from "aws-sdk";
import nodemailer, { Transporter } from "nodemailer";

import mailConfig from "@config/mail";
import { IMailProvider } from "@shared/infra/providers/MailProvider/models/IMailProvider";

import { SendMailDTO } from "../dtos/MailDTO";
import IMailTemplateProvider from "../../MailTemplateProvider/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "../../MailTemplateProvider/HandlebarsMailTemplateProvider";

export class SESMailProvider implements IMailProvider {
  private client: Transporter;
  private _mailTemplateProvider: IMailTemplateProvider;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }),
    });

    this._mailTemplateProvider = new HandlebarsMailTemplateProvider();
  }

  public async send({ subject, templateData, to }: SendMailDTO): Promise<void> {
    const { address, name } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: { address, name },
      to,
      subject,
      html: await this._mailTemplateProvider.parse(templateData),
    });
  }
}
