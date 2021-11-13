import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ForgotPasswordController } from "./../controllers/ForgotPasswordController";
import { ResetPasswordController } from "../controllers/ResetPasswordController";

const passwdRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwdRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.store
);

passwdRouter.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref("password")),
    },
  }),
  resetPasswordController.store
);

export { passwdRouter };
