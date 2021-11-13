import "dotenv/config";
import { PrismaCompanyRepository } from "./../repositories/prisma/PrismaCompanyRepository";
import { ICompanyRepository } from "./../repositories/ICompanyRepository";
import { Company } from ".prisma/client";
import Service from "@shared/core/Service";

interface Request {
  name?: string;
  perPage: number;
  page: number;
}

interface Response {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  data: Company[];
}

export class PaginateCompanyService implements Service<Request, Response> {
  private _companyRepository: ICompanyRepository;

  constructor() {
    this._companyRepository = new PrismaCompanyRepository();
  }
  async execute({ name, page, perPage }: Request): Promise<Response> {
    const { companies, total } = await this._companyRepository.paginate({
      name: name.toUpperCase(),
      page,
      perPage,
    });

    const lastPage = Math.ceil(total / perPage);
    const firstPageUrl = `${process.env.APP_URL}:${
      process.env.APP_PORT
    }/companies?page=${1}&per_page=${perPage}`;
    const lastPageUrl = `${process.env.APP_URL}:${process.env.APP_PORT}/companies?page=${lastPage}&per_page=${perPage}`;
    const nextPageUrl =
      page < lastPage
        ? `${process.env.APP_URL}:${process.env.APP_PORT}/companies?page=${
            page + 1
          }&per_page=${perPage}`
        : null;

    const previousPageUrl =
      page > 1 && page < lastPage
        ? `${process.env.APP_URL}:${process.env.APP_PORT}/companies?page=${
            page - 1
          }&per_page=${perPage}`
        : null;

    return {
      total,
      perPage,
      currentPage: page,
      lastPage,
      firstPageUrl,
      lastPageUrl,
      nextPageUrl,
      previousPageUrl,
      data: companies,
    };
  }
}
