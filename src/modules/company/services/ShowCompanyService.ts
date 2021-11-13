import { PrismaCompanyRepository } from "./../repositories/prisma/PrismaCompanyRepository";
import { Company } from ".prisma/client";
import Service from "@shared/core/Service";
import { ICompanyRepository } from "../repositories/ICompanyRepository";

interface Request {
  cnpj: string;
}

export class ShowCompanyService implements Service<Request, Company> {
  private _companyRepository: ICompanyRepository;

  constructor() {
    this._companyRepository = new PrismaCompanyRepository();
  }
  async execute({ cnpj }: Request): Promise<Company> {
    const company = await this._companyRepository.findByCNPJ(cnpj);

    return company;
  }
}
