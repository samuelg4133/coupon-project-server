import fs from "fs";

import Service from "@shared/core/Service";
import { IReportRepository } from "../repositories/IReportRepository";
import { PrismaReportRepository } from "../repositories/prisma/PrismaReportRepository";

export class DeleteCouponReportsService implements Service<void, void> {
  private _reportRepository: IReportRepository;

  constructor() {
    this._reportRepository = new PrismaReportRepository();
  }

  public async execute(): Promise<void> {
    const reports = await this._reportRepository.deleteMany(10);

    for (let i = 0; i < reports.length; i++) {
      try {
        fs.unlinkSync(reports[i].path);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
