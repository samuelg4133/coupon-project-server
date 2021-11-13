import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";

import { YupErrorResponse } from "@shared/core/YupErrors";

export function createVouchersRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Yup.object().shape({
    expiration: Yup.date().required(),
    quantity: Yup.number().required(),
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
