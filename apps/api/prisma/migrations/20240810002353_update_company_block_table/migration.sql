/*
  Warnings:

  - You are about to drop the column `type_block_id` on the `company_block` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "company_block" DROP CONSTRAINT "company_block_type_block_id_fkey";

-- AlterTable
ALTER TABLE "company_block" DROP COLUMN "type_block_id",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "typeBlockId" TEXT;

-- AddForeignKey
ALTER TABLE "company_block" ADD CONSTRAINT "company_block_typeBlockId_fkey" FOREIGN KEY ("typeBlockId") REFERENCES "TypeBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_block" ADD CONSTRAINT "company_block_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
