/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "subject_code" DROP DEFAULT;
DROP SEQUENCE "Subject_subject_code_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");
