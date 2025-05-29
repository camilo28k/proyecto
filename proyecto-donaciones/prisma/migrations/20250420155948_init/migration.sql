/*
  Warnings:

  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_id_donation_fkey";

-- DropTable
DROP TABLE "payment";

-- CreateTable
CREATE TABLE "payments" (
    "id_payment" TEXT NOT NULL,
    "id_donation" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "paymentstatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id_payment")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_donation_key" ON "payments"("id_donation");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_id_donation_fkey" FOREIGN KEY ("id_donation") REFERENCES "donations"("id_donation") ON DELETE RESTRICT ON UPDATE CASCADE;
