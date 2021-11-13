-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "company" TEXT,
ADD COLUMN     "employee" TEXT,
ALTER COLUMN "employeeId" DROP NOT NULL;
