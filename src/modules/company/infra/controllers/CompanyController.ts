import { ShowCompanyService } from "./../../services/ShowCompanyService";
import { UpdateCompanyService } from "./../../services/UpdateCompanyService";
import { CreateCompanyService } from "./../../services/CreateCompanyService";
import { Request, Response } from "express";
import { DeleteCompanyService } from "@modules/company/services/DeleteCompanyService";
import { PaginateCompanyService } from "@modules/company/services/PaginateCompanyService";

export class CompanyController {
  async index(req: Request, res: Response) {
    const { per_page: perPage, page: page, name: name } = req.query;

    const paginateCompany = new PaginateCompanyService();

    const result = await paginateCompany.execute({
      page: Number(page),
      perPage: Number(perPage),
      name: name ? name.toString() : "",
    });

    return res.json(result);
  }
  async store(req: Request, res: Response) {
    const { cnpj, name, fantasyName } = req.body;

    const createCompany = new CreateCompanyService();

    const company = await createCompany.execute({
      cnpj,
      name,
      fantasyName,
    });

    return res.status(201).send(company);
  }

  async show(req: Request, res: Response) {
    const cnpj = req.params.cnpj;

    const showCompany = new ShowCompanyService();

    const company = await showCompany.execute({
      cnpj,
    });

    return res.json(company);
  }

  async update(req: Request, res: Response) {
    const { name, fantasyName, isActive } = req.body;
    const { company_id: company_id } = req.query;

    const updateCompany = new UpdateCompanyService();

    const company = await updateCompany.execute({
      id: company_id.toString(),
      fantasyName,
      isActive,
      name,
    });

    return res.json(company);
  }

  public async delete(req: Request, res: Response) {
    const { company_id: company_id } = req.query;

    const deleteCompany = new DeleteCompanyService();

    await deleteCompany.execute({
      id: company_id.toString(),
    });

    return res.status(200).send({});
  }
}
