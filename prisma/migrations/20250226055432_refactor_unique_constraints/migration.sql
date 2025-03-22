/*
  Warnings:

  - You are about to drop the column `person` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dinerID` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "person",
ADD COLUMN     "dinerID" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Diner" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Diner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_DINER_NAME" ON "Diner"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_PRODUCT_NAME" ON "Products"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_dinerID_fkey" FOREIGN KEY ("dinerID") REFERENCES "Diner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
