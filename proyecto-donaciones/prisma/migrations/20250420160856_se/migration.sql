-- AlterTable
ALTER TABLE "donations" ADD COLUMN     "status" "paymentstatus" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'completed';
