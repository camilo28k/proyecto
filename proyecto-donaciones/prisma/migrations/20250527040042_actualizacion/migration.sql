/*
  Warnings:

  - You are about to drop the column `status` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_id_donation_fkey";

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "status";

-- DropTable
DROP TABLE "payments";

-- DropEnum
DROP TYPE "paymentstatus";

-- CreateTable
CREATE TABLE "facturas" (
    "id_factura" TEXT NOT NULL,
    "id_donation" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id_factura")
);

-- CreateIndex
CREATE UNIQUE INDEX "facturas_id_donation_key" ON "facturas"("id_donation");

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_id_donation_fkey" FOREIGN KEY ("id_donation") REFERENCES "donations"("id_donation") ON DELETE RESTRICT ON UPDATE CASCADE;
