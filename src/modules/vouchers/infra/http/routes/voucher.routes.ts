import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import { ensureAuthenticated } from "@modules/users/infra/http/middlewares/ensureAuthenticated";

import { VoucherController } from "../controllers/VoucherController";
import { createVouchersRequest } from "../requests/CreateVouchersRequest";

const voucherRouter = Router();
const voucherController = new VoucherController();

voucherRouter.use(ensureAuthenticated);

voucherRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      quantity: Joi.number().max(50000).required(),
    },
  }),
  voucherController.index
);
voucherRouter.post("/", createVouchersRequest, voucherController.store);
voucherRouter.put(
  "/",
  celebrate({
    [Segments.QUERY]: {
      quantity: Joi.number().max(50000).required(),
    },
  }),
  voucherController.update
);

export { voucherRouter };
