import { Company } from ".prisma/client";

import Error from "@shared/core/Error";
import Service from "@shared/core/Service";
import ICacheProvider from "@shared/infra/providers/CacheProvider/ICacheProvider";
import RedisCacheProvider from "@shared/infra/providers/CacheProvider/RedisCacheProvider";
import { filterNumbers } from "@shared/utils/filterNumber";

import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { PrismaCompanyRepository } from "./../repositories/prisma/PrismaCompanyRepository";

interface Request {
  cnpj: string;
  name: string;
  fantasyName?: string;
}

export class CreateCompanyService implements Service<Request, Company> {
  private _cacheProvider: ICacheProvider;
  private _companyRepository: ICompanyRepository;

  constructor() {
    this._cacheProvider = new RedisCacheProvider();
    this._companyRepository = new PrismaCompanyRepository();
  }
  async execute({ cnpj, fantasyName, name }: Request): Promise<Company> {
    const newCNPJ = filterNumbers(cnpj);
    const companyAlreadyExists = await this._companyRepository.findByCNPJ(
      newCNPJ
    );

    if (companyAlreadyExists) {
      throw new Error({
        message: "CNPJ is already booked.",
      });
    }

    const company = await this._companyRepository.create({
      cnpj: newCNPJ,
      name: name.toUpperCase(),
      fantasyName: fantasyName ? fantasyName.toUpperCase() : null,
    });

    await this._cacheProvider.delete("employees-list");
    await this._cacheProvider.delete("employees-active-list");

    return company;
  }
}
