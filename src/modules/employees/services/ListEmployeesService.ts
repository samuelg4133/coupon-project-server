import { PrismaEmployeeRepository } from "./../repositories/prisma/PrismaEmployeeRepository";
import RedisCacheProvider from "@shared/infra/providers/CacheProvider/RedisCacheProvider";
import { IEmployeeRepository } from "./../repositories/IEmployeeRepository";
import { Employee } from ".prisma/client";
import Service from "@shared/core/Service";
import ICacheProvider from "@shared/infra/providers/CacheProvider/ICacheProvider";
import { Company } from "@prisma/client";

export class ListEmployeesService
  implements
    Service<
      null,
      (Employee & {
        company: Company;
      })[]
    >
{
  private _employeeRepository: IEmployeeRepository;
  private _cacheProvider: ICacheProvider;

  constructor() {
    this._cacheProvider = new RedisCacheProvider();
    this._employeeRepository = new PrismaEmployeeRepository();
  }
  async execute(): Promise<
    (Employee & {
      company: Company;
    })[]
  > {
    let employees = await this._cacheProvider.recover<
      (Employee & {
        company: Company;
      })[]
    >("employees-list");

    if (!employees) {
      employees = await this._employeeRepository.findAll();

      await this._cacheProvider.save("employees-list", employees);
    }

    return employees;
  }
}
