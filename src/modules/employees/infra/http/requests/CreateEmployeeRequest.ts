import { NextFunction, Request, Response } from "express";
import { validateCPF } from "validations-br";
import * as Yup from "yup";

import { YupErrorResponse } from "@shared/core/YupErrors";

export function createEmployeeRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Yup.object().shape({
    cpf: Yup.string().test("is-cpf", "CPF is not valid", (value) =>
      validateCPF(value)
    ),
    name: Yup.string().required(),
    companyId: Yup.string().required(),
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
