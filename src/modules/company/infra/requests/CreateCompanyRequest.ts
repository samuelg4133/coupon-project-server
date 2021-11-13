import { YupErrorResponse } from "@shared/core/YupErrors";
import { NextFunction, Request, Response } from "express";
import { validateCNPJ } from "validations-br";
import * as Yup from "yup";

export function createCompanyRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Yup.object().shape({
    cnpj: Yup.string().test("is-cnpj", "CNPJ is not valid", (value) =>
      validateCNPJ(value)
    ),
    name: Yup.string().required(),
    fantasyName: Yup.string().optional(),
  });

  schema
    .validate(req.body, {
      abortEarly: false,
    })
    .then((_) => {
      next();
    })
    .catch((err: YupErrorResponse) => {
      return res.status(400).json(err.inner);
    });
}
