import { NextFunction, Request, Response } from "express";
import { validateCPF } from "validations-br";
import * as Yup from "yup";

import { YupErrorResponse } from "@shared/core/YupErrors";

export function createCouponRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Yup.object().shape({
    company: Yup.string().required(),
    employee: Yup.string().required(),
    cpf: Yup.string()
      .required()
      .test("is-cpf", "CPF is not valid", (value) => validateCPF(value)),
    email: Yup.string().email(),
    name: Yup.string().required(),
    phone: Yup.string().required(),
    voucher: Yup.string().required(),
    address: Yup.object().shape({
      place: Yup.string().required(),
      number: Yup.string().required(),
      city: Yup.string().min(2).required(),
      state: Yup.string().min(2).required(),
      district: Yup.string().min(2).required(),
      zipCode: Yup.string().required(),
    }),
  });

  schema
    .validate(req.body, {
      abortEarly: false,
    })
    .then((_) => {
      next();
    })
    .catch((err: YupErrorResponse) => {
      console.log(err);
      return res.status(400).json(err.inner);
    });
}
