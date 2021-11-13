import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";

import { YupErrorResponse } from "@shared/core/YupErrors";
import { passwordIsStrong } from "@shared/utils/verifyPassword";

export async function createUserRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    login: Yup.string().required(),
    password: Yup.string()
      .required()
      .min(8)
      .test(
        "password-is-strong",
        "a senha deve ter pelo menos 8 caracteres, 1 letra maiuscula, 1 número, 1 símbolo e não pode ter caracteres iguais em sequência.",
        (value) => passwordIsStrong(value)
      ),
    passwordConfirmation: Yup.string()
      .required()
      .min(6)
      .oneOf([null, Yup.ref("password")])
      .required(),
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
