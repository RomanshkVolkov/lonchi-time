-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "hasCoca" BOOLEAN NOT NULL DEFAULT false;
