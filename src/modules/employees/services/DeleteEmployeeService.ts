import Service from "@shared/core/Service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import Error from "@shared/core/Error";

import { PrismaEmployeeRepository } from "./../repositories/prisma/PrismaEmployeeRepository";

import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import ICacheProvider from "@shared/infra/providers/CacheProvider/ICacheProvider";
import RedisCacheProvider from "@shared/infra/providers/CacheProvider/RedisCacheProvider";

interface Request {
  id: string;
}

export class DeleteEmployeeService implements Service<Request, void> {
  private _cacheProvider: ICacheProvider;
  private _employeeRepository: IEmployeeRepository;

  constructor() {
    this._cacheProvider = new RedisCacheProvider();
    this._employeeRepository = new PrismaEmployeeRepository();
  }

  async execute({ id }: Request): Promise<void> {
    try {
      await this._employeeRepository.delete(id);
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
