import { Request, Response } from "express";

import { ListActiveCompaniesService } from "./../../services/ListActiveCompaniesService";

export class ActiveCompaniesController {
  public async index(request: Request, response: Response) {
    const activeCompanies = new ListActiveCompaniesService();

    const companies = await activeCompanies.execute();

    return response.json(companies);
  }
}
