/*
  Warnings:

  - Added the required column `filename` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "filename" TEXT NOT NULL;
