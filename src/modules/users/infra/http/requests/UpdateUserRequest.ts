import { YupErrorResponse } from "@shared/core/YupErrors";
import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";

export async function updateUserRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    login: Yup.string().required(),
    oldPassword: Yup.string().optional(),
    password: Yup.string().optional().min(6),
    passwordConfirmation: Yup.string()
      .optional()
      .min(6)
      .oneOf([null, Yup.ref("password")]),
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
