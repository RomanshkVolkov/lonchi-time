/*
  Warnings:

  - You are about to drop the column `dinerID` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Diner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_dinerID_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "dinerID";

-- DropTable
DROP TABLE "Diner";
