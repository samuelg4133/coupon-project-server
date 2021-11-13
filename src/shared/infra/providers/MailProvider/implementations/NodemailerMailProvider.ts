import nodemailer, { Transporter } from "nodemailer";

import HandlebarsMailTemplateProvider from "../../MailTemplateProvider/HandlebarsMailTemplateProvider";
import IMailTemplateProvider from "../../MailTemplateProvider/IMailTemplateProvider";

import { SendMailDTO } from "../dtos/MailDTO";
import { IMailProvider } from "../models/IMailProvider";

export class NodemailerMailProvider implements IMailProvider {
  private _client: Transporter;
  private _mailTemplate: IMailTemplateProvider;

  constructor() {
    this._mailTemplate = new HandlebarsMailTemplateProvider();
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this._client = transporter;
    });
  }

  public async send({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    this._client.sendMail({
      from,
      to,
      subject,
      html: await this._mailTemplate.parse(templateData),
    });
  }
}
