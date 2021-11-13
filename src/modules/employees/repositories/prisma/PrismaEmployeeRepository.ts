import { Employee } from ".prisma/client";

import {
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
} from "@modules/employees/dtos/EmployeeDTO";
import { Company } from "@prisma/client";
import { prisma } from "@shared/infra/prisma/client";

import { IEmployeeRepository } from "./../IEmployeeRepository";

export class PrismaEmployeeRepository implements IEmployeeRepository {
  async create({ companyId, cpf, name }: CreateEmployeeDTO): Promise<Employee> {
    const employee = await prisma.employee.create({
      data: {
        companyId,
        cpf,
        name,
      },
    });

    return employee;
  }

  async delete(id: string): Promise<void> {
    await prisma.employee.delete({
      where: {
        id,
      },
    });
  }

  async findActives(): Promise<
    {
      id: string;
      name: string;
      company: Company;
    }[]
  > {
    const employees = await prisma.employee.findMany({
      where: {
        isActive: true,
        company: {
          isActive: true,
        },
      },
      select: {
        id: true,
        name: true,
        company: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return employees;
  }

  async findAll(): Promise<
    (Employee & {
      company: Company;
    })[]
  > {
    const employees = await prisma.employee.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        company: true,
      },
    });

    return employees;
  }

  async findByCPF(cpf: string): Promise<Employee> {
    const employee = await prisma.employee.findUnique({
      where: {
        cpf,
      },
    });

    return employee;
  }

  async update({
    id,
    companyId,
    isActive,
    name,
  }: UpdateEmployeeDTO): Promise<Employee> {
    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data: {
        isActive,
        companyId,
        name,
      },
    });

    return employee;
  }
}
