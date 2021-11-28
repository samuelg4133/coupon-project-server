import { Report } from "@prisma/client";

export interface IReportRepository {
  deleteMany(skip: number): Promise<Report[]>;
  findById(id: string): Promise<Report>;
  save(filename: string, path: string): Promise<void>;
  take(limit: number): Promise<Report[]>;
}
