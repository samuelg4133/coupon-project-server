import { Report } from ".prisma/client";
import { prisma } from "@shared/infra/prisma/client";
import { IReportRepository } from "./../IReportRepository";

export class PrismaReportRepository implements IReportRepository {
  public async findById(id: string): Promise<Report> {
    const report = await prisma.report.findUnique({
      where: {
        id,
      },
    });

    return report;
  }
  public async deleteMany(skip: number): Promise<Report[]> {
    const ids = await prisma.report.findMany({
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });
    for (let i = 0; i < ids.length; i++) {
      await prisma.report.delete({
        where: { id: ids[i].id },
      });
    }

    return ids;
  }
  public async take(limit: number): Promise<Report[]> {
    const reports = await prisma.report.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return reports;
  }
  public async save(filename: string, path: string): Promise<void> {
    await prisma.report.create({
      data: {
        filename,
        path,
      },
    });
  }
}
