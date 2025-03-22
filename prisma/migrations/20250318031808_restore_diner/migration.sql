/*
  Warnings:

  - Added the required column `dinerID` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "dinerID" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Diner" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Diner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_DINER_NAME" ON "Diner"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_dinerID_fkey" FOREIGN KEY ("dinerID") REFERENCES "Diner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
