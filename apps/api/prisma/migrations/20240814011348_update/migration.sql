-- AlterTable
ALTER TABLE "company_block_hour" ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);