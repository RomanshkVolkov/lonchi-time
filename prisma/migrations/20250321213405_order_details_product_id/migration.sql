/*
  Warnings:

  - You are about to drop the column `productsID` on the `OrderDetails` table. All the data in the column will be lost.
  - Added the required column `productID` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_productsID_fkey";

-- AlterTable
ALTER TABLE "OrderDetails" DROP COLUMN "productsID",
ADD COLUMN     "productID" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
