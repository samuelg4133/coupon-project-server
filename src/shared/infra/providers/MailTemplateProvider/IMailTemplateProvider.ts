import IParseMailTemplateDTO from "./dtos/MailTemplateDTO";

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
