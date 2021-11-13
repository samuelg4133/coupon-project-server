/*
  Warnings:

  - A unique constraint covering the columns `[voucher]` on the table `coupons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `voucher` to the `coupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "voucher" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "coupons_voucher_key" ON "coupons"("voucher");
