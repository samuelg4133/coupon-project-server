import { CouponReportController } from "./../controllers/CouponReportController";
import { Router } from "express";

import { ensureAuthenticated } from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const reportRouter = Router();
const couponReportController = new CouponReportController();

reportRouter.use(ensureAuthenticated);

reportRouter.delete("/coupons", couponReportController.delete);
reportRouter.get("/coupons", couponReportController.index);
reportRouter.get("/coupons/:id", couponReportController.show);
reportRouter.post("/coupons", couponReportController.store);

export { reportRouter };
