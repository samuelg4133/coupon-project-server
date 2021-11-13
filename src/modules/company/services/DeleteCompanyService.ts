import { PrismaCompanyRepository } from "./../repositories/prisma/PrismaCompanyRepository";
import Service from "@shared/core/Service";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import Error from "@shared/core/Error";
import ICacheProvider from "@shared/infra/providers/CacheProvider/ICacheProvider";
import RedisCacheProvider from "@shared/infra/providers/CacheProvider/RedisCacheProvider";

interface Request {
  id: string;
}

export class DeleteCompanyService implements Service<Request, void> {
  private _cacheProvider: ICacheProvider;
  private _companyRepository: ICompanyRepository;

  constructor() {
    this._cacheProvider = new RedisCacheProvider();
    this._companyRepository = new PrismaCompanyRepository();
  }
  async execute({ id }: Request): Promise<void> {
    try {
      await this._companyRepository.delete(id);
      await this._cacheProvider.delete("employees-list");
      await this._cacheProvider.delete("employees-active-list");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new Error({
          message: error.meta,
        });
      }
    }
  }
}
