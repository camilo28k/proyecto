-- CreateEnum
CREATE TYPE "paymentstatus" AS ENUM ('Pending', 'completed', 'failed');

-- CreateTable
CREATE TABLE "categorys" (
    "id_category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorys_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id_campaign" TEXT NOT NULL,
    "id_category" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phonet" TEXT NOT NULL,
    "meta" DOUBLE PRECISION NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id_campaign")
);

-- CreateTable
CREATE TABLE "comments" (
    "id_comment" TEXT NOT NULL,
    "id_campaign" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id_comment")
);

-- CreateTable
CREATE TABLE "donations" (
    "id_donation" TEXT NOT NULL,
    "id_campaign" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id_donation")
);

-- CreateTable
CREATE TABLE "payment" (
    "id_payment" TEXT NOT NULL,
    "id_donation" TEXT NOT NULL,
    "status" "paymentstatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id_payment")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_id_donation_key" ON "payment"("id_donation");

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categorys"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_campaign_fkey" FOREIGN KEY ("id_campaign") REFERENCES "campaigns"("id_campaign") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_id_campaign_fkey" FOREIGN KEY ("id_campaign") REFERENCES "campaigns"("id_campaign") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_id_donation_fkey" FOREIGN KEY ("id_donation") REFERENCES "donations"("id_donation") ON DELETE RESTRICT ON UPDATE CASCADE;
