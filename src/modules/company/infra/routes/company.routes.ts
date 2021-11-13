import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import { ensureAuthenticated } from "@modules/users/infra/http/middlewares/ensureAuthenticated";

import { ActiveCompaniesController } from "../controllers/ActiveCompaniesController";
import { CompanyController } from "./../controllers/CompanyController";

import { createCompanyRequest } from "../requests/CreateCompanyRequest";
import { updateCompanyRequest } from "../requests/UpdateCompanyRequest";

const companyRouter = Router();
const activeCompaniesController = new ActiveCompaniesController();
const companyController = new CompanyController();

companyRouter.use(ensureAuthenticated);

companyRouter.get("/active", activeCompaniesController.index);

companyRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      per_page: Joi.number().required(),
      page: Joi.number().required(),
      name: Joi.string(),
    },
  }),
  companyController.index
);
//store
companyRouter.post("/", createCompanyRequest, companyController.store);
//show
companyRouter.get("/:cnpj", companyController.show);
//update
companyRouter.put(
  "/",
  celebrate({
    [Segments.QUERY]: {
      company_id: Joi.string().required(),
    },
  }),
  updateCompanyRequest,
  companyController.update
);
//delete
companyRouter.delete(
  "/",
  celebrate({
    [Segments.QUERY]: {
      company_id: Joi.string().required(),
    },
  }),
  companyController.delete
);

export { companyRouter };
