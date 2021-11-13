import Service from "@shared/core/Service";

import { PrismaEmployeeRepository } from "./../repositories/prisma/PrismaEmployeeRepository";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import ICacheProvider from "@shared/infra/providers/CacheProvider/ICacheProvider";
import RedisCacheProvider from "@shared/infra/providers/CacheProvider/RedisCacheProvider";

interface Response {
  id: string;
  name: string;
  company: {
    name: string;
  };
}

export class ListActiveEmployeesService implements Service<null, Response[]> {
  private _cacheProvider: ICacheProvider;
  private _employeeRepository: IEmployeeRepository;

  constructor() {
    this._cacheProvider = new RedisCacheProvider();
    this._employeeRepository = new PrismaEmployeeRepository();
  }
  async execute(): Promise<Response[]> {
    let employees = await this._cacheProvider.recover<Response[]>(
      "employees-active-list"
    );

    if (!employees) {
      employees = await this._employeeRepository.findActives();

      await this._cacheProvider.save("employees-active-list", employees);
    }

    return employees;
  }
}
