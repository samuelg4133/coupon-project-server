import { PrismaReportRepository } from "./../repositories/prisma/PrismaReportRepository";
import Service from "@shared/core/Service";
import { IReportRepository } from "../repositories/IReportRepository";
import { Report } from ".prisma/client";

export class ListLastTenCouponReportService implements Service<void, Report[]> {
  private _reportRepository: IReportRepository;

  constructor() {
    this._reportRepository = new PrismaReportRepository();
  }

  public async execute(): Promise<Report[]> {
    const reports = this._reportRepository.take(10);
    return reports;
  }
}
