/*
  Warnings:

  - You are about to drop the column `type` on the `function_points` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "function_points" DROP COLUMN "type",
ADD COLUMN     "type_function" "TypeCountEnum" NOT NULL DEFAULT 'Development';
