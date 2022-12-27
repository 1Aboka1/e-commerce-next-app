/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Customer');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "Role" NOT NULL DEFAULT 'Customer';

-- DropTable
DROP TABLE "Example";
