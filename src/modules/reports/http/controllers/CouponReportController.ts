import { DownloadCouponReportService } from "./../../services/DownloadCouponReportService";
import { ListLastTenCouponReportService } from "./../../services/ListLastTenCouponReportService";
import { Request, Response } from "express";
import { DeleteCouponReportsService } from "@modules/reports/services/DeleteCouponReportsService";

import Queue from "@shared/infra/queue/bull";
import mime from "mime";

export class CouponReportController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listReports = new ListLastTenCouponReportService();

    const reports = await listReports.execute();

    return response.json(reports);
  }

  public async show(request: Request, response: Response): Promise<void> {
    const { id: id } = request.params;
    const downloadFile = new DownloadCouponReportService();
    const { filename, path } = await downloadFile.execute({
      id,
    });

    const mimetype = mime.lookup(path);

    response.setHeader(
      "Content-disposition",
      "attachment; filename=" + filename
    );
    response.setHeader("Content-type", mimetype);

    response.download(path);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const q = new Queue();

    await q.add("CouponsReport");

    return response.status(201).json({});
  }

  public async delete(_: Request, response: Response): Promise<Response> {
    const deleteReports = new DeleteCouponReportsService();

    await deleteReports.execute();

    return response.status(204).json({});
  }
}
