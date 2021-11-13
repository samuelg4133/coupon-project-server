import {
  CreateCompanyDTO,
  PaginateCompanyDTO,
  UpdateCompanyDTO,
} from "./../dtos/CompanyDTO";
import { Company } from ".prisma/client";

export interface ICompanyRepository {
  create(data: CreateCompanyDTO): Promise<Company>;
  delete(id: string): Promise<void>;
  findByStatus(
    status: boolean
  ): Promise<{ id: string; cnpj: string; name: string }[]>;
  findById(id: string): Promise<Company>;
  findByCNPJ(cnpj: string): Promise<Company>;
  paginate(
    data: PaginateCompanyDTO
  ): Promise<{ companies: Company[]; total: number }>;
  update(data: UpdateCompanyDTO): Promise<Company>;
}
