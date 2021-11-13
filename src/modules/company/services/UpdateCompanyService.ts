import { Company } from ".prisma/client";
import Error from "@shared/core/Error";
import Service from "@shared/core/Service";
import ICacheProvider from "@shared/infra/providers/CacheProvider/ICacheProvider";
import RedisCacheProvider from "@shared/infra/providers/CacheProvider/RedisCacheProvider";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { PrismaCompanyRepository } from "../repositories/prisma/PrismaCompanyRepository";

interface Request extends Omit<Company, "cnpj" | "createdAt" | "updatedAt"> {}

export class UpdateCompanyService implements Service<Request, Company> {
  private _cacheProvider: ICacheProvider;
  private _companyRepository: ICompanyRepository;

  constructor() {
    this._cacheProvider = new RedisCacheProvider();
    this._companyRepository = new PrismaCompanyRepository();
  }

  async execute({
    id,
    name,
    fantasyName,
    isActive,
  }: Request): Promise<Company> {
    try {
      const updatedCompany = await this._companyRepository.update({
        id,
        isActive,
        fantasyName: fantasyName ? fantasyName.toUpperCase() : null,
        name: name.toUpperCase(),
      });

      await this._cacheProvider.delete("employees-list");
      await this._cacheProvider.delete("employees-active-list");

      return updatedCompany;
    } catch {
      throw new Error({
        message: "Error on update company.",
      });
    }
  }
}
