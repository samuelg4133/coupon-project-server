import Service from "@shared/core/Service";
import { IReportRepository } from "../repositories/IReportRepository";
import { PrismaReportRepository } from "../repositories/prisma/PrismaReportRepository";
// import Report from "../mongoose/Report";

interface IRequest {
  id: string;
}

interface IResponse {
  filename: string;
  path: string;
}

export class DownloadCouponReportService
  implements Service<IRequest, IResponse>
{
  private _reportRepository: IReportRepository;

  constructor() {
    this._reportRepository = new PrismaReportRepository();
  }
  public async execute({ id }: IRequest): Promise<IResponse> {
    const { path, filename } = await this._reportRepository.findById(id);
    return {
      filename,
      path,
    };
  }
}
