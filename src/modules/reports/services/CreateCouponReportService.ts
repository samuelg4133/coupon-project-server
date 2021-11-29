import { PrismaReportRepository } from "./../repositories/prisma/PrismaReportRepository";
import { PrismaCouponRepository } from "./../../coupons/repositories/prisma/PrismaCouponRepository";
import { Workbook } from "exceljs";
import path from "path";
import { ICouponRepository } from "@modules/coupons/repositories/ICouponRepository";
import Service from "@shared/core/Service";
import { IReportRepository } from "../repositories/IReportRepository";

export class CreateCouponReportService implements Service<void, void> {
  private _couponRepository: ICouponRepository;
  private _reportRepository: IReportRepository;
  private _workbook: Workbook;

  constructor() {
    this._couponRepository = new PrismaCouponRepository();
    this._reportRepository = new PrismaReportRepository();
    this._workbook = new Workbook();
  }

  public async execute(): Promise<void> {
    const coupons = await this._couponRepository.findAll();
    const worksheet = this._workbook.addWorksheet("dados");

    for (let i = 1; i <= coupons.length; i++) {
      worksheet.getCell(`A${i + 1}`).value = coupons[i - 1].voucher;
      worksheet.getCell(`B${i + 1}`).value = coupons[i - 1].client.cpf;
      worksheet.getCell(`C${i + 1}`).value = coupons[i - 1].client.name;
      worksheet.getCell(`D${i + 1}`).value = coupons[i - 1].client.phone;
      worksheet.getCell(`E${i + 1}`).value = coupons[i - 1].company;
      worksheet.getCell(`F${i + 1}`).value = coupons[i - 1].employee;
      worksheet.getCell(`G${i + 1}`).value = coupons[i - 1].createdAt;
    }

    const file = `cupons${Date.now()}.xlsx`;

    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "tmp",
      file
    );

    await this._workbook.xlsx.writeFile(filePath);

    await this._reportRepository.save(file, filePath);
  }
}
