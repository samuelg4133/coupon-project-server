import { PrismaEmployeeRepository } from "./../repositories/prisma/PrismaEmployeeRepository";
import { Employee } from ".prisma/client";
import Service from "@shared/core/Service";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import Error from "@shared/core/Error";
import ICacheProvider from "@shared/infra/providers/CacheProvider/ICacheProvider";
import RedisCacheProvider from "@shared/infra/providers/CacheProvider/RedisCacheProvider";
import { filterNumbers } from "@shared/utils/filterNumber";

interface Request {
  companyId: string;
  cpf: string;
  name: string;
}

export class CreateEmployeeService implements Service<Request, Employee> {
  private _cacheProvider: ICacheProvider;
  private _employeeRepository: IEmployeeRepository;

  constructor() {
    this._employeeRepository = new PrismaEmployeeRepository();
    this._cacheProvider = new RedisCacheProvider();
  }
  async execute({ companyId, cpf, name }: Request): Promise<Employee> {
    const newCpf = filterNumbers(cpf);
    const employeeAlreadyExists = await this._employeeRepository.findByCPF(
      newCpf
    );

    if (employeeAlreadyExists) {
      throw new Error({
        message: "CPF is already booked.",
      });
    }

    const employee = await this._employeeRepository.create({
      companyId,
      cpf: newCpf,
      name: name.toUpperCase(),
    });

    await this._cacheProvider.delete("employees-list");
    await this._cacheProvider.delete("employees-active-list");

    return employee;
  }
}
