import { CouponController } from "./../controllers/CouponController";
import { Router } from "express";
import { createCouponRequest } from "../requests/CreateCouponRequest";
import { ensureAuthenticated } from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";

const couponRouter = Router();
const couponController = new CouponController();

couponRouter.post("/", createCouponRequest, couponController.store);
couponRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      per_page: Joi.number().required(),
      page: Joi.number().required(),
    },
  }),
  ensureAuthenticated,
  couponController.index
);

export { couponRouter };
