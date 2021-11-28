import { DeleteCouponReportsService } from "./../../../../modules/reports/services/DeleteCouponReportsService";

import { CreateCouponReportService } from "@modules/reports/services/CreateCouponReportService";
import Job from "@shared/core/Job";

export default {
  key: "CouponsReport",
  async handle() {
    const createCouponReport = new CreateCouponReportService();
    const deleteCouponReport = new DeleteCouponReportsService();

    await createCouponReport.execute();
    await deleteCouponReport.execute();
  },
} as Job<void>;
