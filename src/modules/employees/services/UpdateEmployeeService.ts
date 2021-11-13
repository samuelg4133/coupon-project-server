import ICacheProvider from "@shared/infra/providers/CacheProvider/ICacheProvider";
import { PrismaEmployeeRepository } from "./../repositories/prisma/PrismaEmployeeRepository";
import { Employee } from ".prisma/client";
import Service from "@shared/core/Service";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import Error from "@shared/core/Error";
import RedisCacheProvider from "@shared/infra/providers/CacheProvider/RedisCacheProvider";

interface Request {
  id: string;
  name: string;
  companyId: string;
  isActive: boolean;
}

export class UpdateEmployeeService implements Service<Request, Employee> {
  private _cacheProvider: ICacheProvider;
  private _employeeRepository: IEmployeeRepository;

  constructor() {
    this._employeeRepository = new PrismaEmployeeRepository();
    this._cacheProvider = new RedisCacheProvider();
  }
  async execute({ companyId, id, isActive, name }: Request): Promise<Employee> {
    try {
      const updatedEmployee = await this._employeeRepository.update({
        companyId,
        id,
        isActive,
        name: name.toUpperCase(),
      });

      await this._cacheProvider.delete("employees-list");
      await this._cacheProvider.delete("employees-active-list");

      return updatedEmployee;
    } catch {
      throw new Error({
        message: "Error on update employee",
      });
    }
  }
}
