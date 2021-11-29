import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ClientCouponsController } from "../controllers/ClientCouponsController";

const clientCouponsRouter = Router();
const clientCouponsController = new ClientCouponsController();

clientCouponsRouter.get(
  "/coupons/:cpf",
  celebrate({
    [Segments.QUERY]: {
      per_page: Joi.number().required(),
      page: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      cpf: Joi.string().required(),
    },
  }),
  clientCouponsController.show
);

export { clientCouponsRouter };
