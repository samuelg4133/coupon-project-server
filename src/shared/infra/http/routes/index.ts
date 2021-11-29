import { companyRouter } from "@modules/company/infra/routes/company.routes";
import { clientCouponsRouter } from "@modules/coupons/infra/http/routes/clientcoupons.routes";
import { couponRouter } from "@modules/coupons/infra/http/routes/coupon.routes";
import { employeeRouter } from "@modules/employees/infra/http/routes/employee.routes";
import { reportRouter } from "@modules/reports/http/routes/report.routes";
import { passwdRouter } from "@modules/users/infra/http/routes/password.routes";
import { sessionRouter } from "@modules/users/infra/http/routes/session.routes";
import { userRouter } from "@modules/users/infra/http/routes/user.routes";
import { voucherRouter } from "@modules/vouchers/infra/http/routes/voucher.routes";
import { Router } from "express";

const routes = Router();

routes.use("/clients", clientCouponsRouter);
routes.use("/companies", companyRouter);
routes.use("/coupons", couponRouter);
routes.use("/employees", employeeRouter);
routes.use("/password", passwdRouter);
routes.use("/reports", reportRouter);
routes.use("/sessions", sessionRouter);
routes.use("/users", userRouter);
routes.use("/vouchers", voucherRouter);

export default routes;
