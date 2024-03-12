-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('BESTSELLER', 'FEATURE', 'GENERAL', 'TRENDING');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "type" "ProductType" NOT NULL DEFAULT 'GENERAL';
