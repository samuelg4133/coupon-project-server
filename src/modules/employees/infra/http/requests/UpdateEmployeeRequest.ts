// companyId, id, isActive, name
import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";

import { YupErrorResponse } from "@shared/core/YupErrors";

export function updateEmployeeRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
    isActive: Yup.boolean().required(),
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
