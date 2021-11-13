import { PrismaEmployeeRepository } from "./../repositories/prisma/PrismaEmployeeRepository";
import { Employee } from ".prisma/client";
import Service from "@shared/core/Service";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";

interface Request {
  cpf: string;
}

export class ShowEmployeeService implements Service<Request, Employee> {
  private _employeeRepository: IEmployeeRepository;

  constructor() {
    this._employeeRepository = new PrismaEmployeeRepository();
  }

  async execute({ cpf }: Request): Promise<Employee> {
    const employee = await this._employeeRepository.findByCPF(cpf);

    return employee;
  }
}
