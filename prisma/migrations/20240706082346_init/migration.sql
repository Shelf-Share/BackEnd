/*
  Warnings:

  - Added the required column `imageUrl` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "imageUrl" TEXT NOT NULL;
