/*
  Warnings:

  - You are about to drop the `function_points` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `functions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maintenances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `requests_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "function_points" DROP CONSTRAINT "function_points_project_id_fkey";

-- DropForeignKey
ALTER TABLE "functions" DROP CONSTRAINT "functions_maintenance_id_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_accountable_id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_project_id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_request_id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_request_type_id_fkey";

-- DropTable
DROP TABLE "function_points";

-- DropTable
DROP TABLE "functions";

-- DropTable
DROP TABLE "maintenances";

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "requests";

-- DropTable
DROP TABLE "requests_type";

-- DropEnum
DROP TYPE "Complexity";

-- DropEnum
DROP TYPE "FunctionType";

-- DropEnum
DROP TYPE "TypeCount";
