import { SendMailDTO } from "../dtos/MailDTO";

export interface IMailProvider {
  send(data: SendMailDTO): Promise<void>;
}
