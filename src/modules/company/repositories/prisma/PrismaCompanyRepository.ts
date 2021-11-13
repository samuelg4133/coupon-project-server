import { PaginateCompanyDTO } from "./../../dtos/CompanyDTO";
import { prisma } from "@shared/infra/prisma/client";
import { Company } from ".prisma/client";
import {
  CreateCompanyDTO,
  UpdateCompanyDTO,
} from "@modules/company/dtos/CompanyDTO";
import { ICompanyRepository } from "../ICompanyRepository";
import { string } from "yup/lib/locale";

export class PrismaCompanyRepository implements ICompanyRepository {
  async create({
    cnpj,
    name,
    fantasyName,
  }: CreateCompanyDTO): Promise<Company> {
    const company = await prisma.company.create({
      data: {
        cnpj,
        name,
        fantasyName,
      },
    });

    return company;
  }

  async delete(id: string): Promise<void> {
    await prisma.company.delete({
      where: {
        id,
      },
    });
  }

  async findByCNPJ(cnpj: string): Promise<Company> {
    const company = await prisma.company.findUnique({
      where: {
        cnpj,
      },
    });

    return company;
  }

  async findById(id: string): Promise<Company> {
    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    });

    return company;
  }

  async findByStatus(
    status: boolean
  ): Promise<{ id: string; cnpj: string; name: string }[]> {
    const companies = await prisma.company.findMany({
      where: {
        isActive: status,
      },
      select: {
        id: true,
        cnpj: true,
        name: true,
      },
    });

    return companies;
  }

  async paginate({
    name,
    perPage,
    page,
  }: PaginateCompanyDTO): Promise<{ companies: Company[]; total: number }> {
    const [companies, total] = await prisma.$transaction([
      prisma.company.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        where: {
          name: {
            contains: name,
          },
        },
        orderBy: {
          name: "asc",
        },
      }),
      prisma.company.count(),
    ]);

    return { companies, total };
  }

  async update({
    id,
    fantasyName,
    isActive,
    name,
  }: UpdateCompanyDTO): Promise<Company> {
    const company = await prisma.company.update({
      where: {
        id,
      },
      data: {
        fantasyName,
        isActive,
        name,
      },
    });

    return company;
  }
}
