import { YupErrorResponse } from "@shared/core/YupErrors";
import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";

export function updateCompanyRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    fantasyName: Yup.string(),
    isActive: Yup.boolean().required(),
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
