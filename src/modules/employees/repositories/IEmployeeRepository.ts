import { Company, Employee } from "@prisma/client";
import { CreateEmployeeDTO, UpdateEmployeeDTO } from "../dtos/EmployeeDTO";

export interface IEmployeeRepository {
  create(data: CreateEmployeeDTO): Promise<Employee>;
  delete(id: string): Promise<void>;
  findAll(): Promise<
    (Employee & {
      company: Company;
    })[]
  >;
  findActives(): Promise<
    {
      id: string;
      name: string;
      company: Company;
    }[]
  >;
  findByCPF(cpf: string): Promise<Employee>;
  update(data: UpdateEmployeeDTO): Promise<Employee>;
}
