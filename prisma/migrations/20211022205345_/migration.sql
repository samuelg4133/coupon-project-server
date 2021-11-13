-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_clientId_fkey";

-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_companyId_fkey";

-- DropForeignKey
ALTER TABLE "user_tokens" DROP CONSTRAINT "user_tokens_userId_fkey";

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
