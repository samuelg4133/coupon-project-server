import IParseMailTemplateDTO from "../../MailTemplateProvider/dtos/MailTemplateDTO";

interface MailContact {
  name: string;
  address: string;
}

export interface SendMailDTO {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
