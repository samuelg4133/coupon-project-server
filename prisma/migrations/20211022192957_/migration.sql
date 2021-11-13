/*
  Warnings:

  - You are about to drop the column `created_at` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `fantasy_name` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `is_selected` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `user_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - The required column `refreshToken` was added to the `user_tokens` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `user_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_client_id_fkey";

-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_company_id_fkey";

-- DropForeignKey
ALTER TABLE "user_tokens" DROP CONSTRAINT "user_tokens_user_id_fkey";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "created_at",
DROP COLUMN "fantasy_name",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fantasyName" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "client_id",
DROP COLUMN "created_at",
DROP COLUMN "employee_id",
DROP COLUMN "is_active",
DROP COLUMN "is_selected",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "employeeId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSelected" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_tokens" DROP COLUMN "created_at",
DROP COLUMN "refresh_token",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "refreshToken" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
