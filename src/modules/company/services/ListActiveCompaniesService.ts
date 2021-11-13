import { PrismaCompanyRepository } from "./../repositories/prisma/PrismaCompanyRepository";
import { ICompanyRepository } from "./../repositories/ICompanyRepository";
import Service from "@shared/core/Service";

interface Response {
  id: string;
  cnpj: string;
  name: string;
}
export class ListActiveCompaniesService implements Service<null, Response[]> {
  private _companyRepository: ICompanyRepository;

  constructor() {
    this._companyRepository = new PrismaCompanyRepository();
  }
  async execute(): Promise<Response[]> {
    const companies = await this._companyRepository.findByStatus(true);

    return companies;
  }
}
