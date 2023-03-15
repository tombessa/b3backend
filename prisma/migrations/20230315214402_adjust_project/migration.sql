-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_accountable_id_fkey";

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "accountable_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_accountable_id_fkey" FOREIGN KEY ("accountable_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
