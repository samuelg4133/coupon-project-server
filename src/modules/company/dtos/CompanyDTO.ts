import { Company } from ".prisma/client";

export interface CreateCompanyDTO {
  cnpj: string;
  name: string;
  fantasyName?: string;
}

export interface PaginateCompanyDTO {
  name?: string;
  perPage: number;
  page: number;
}

export interface UpdateCompanyDTO
  extends Omit<Company, "cnpj" | "createdAt" | "updatedAt"> {}
