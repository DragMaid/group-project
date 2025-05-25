/*
  Warnings:

  - Made the column `description` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "imgUrl" SET DEFAULT 'storage/post/default.png';

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarUrl" SET DEFAULT 'storage/user/default.png';
