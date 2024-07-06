/*
  Warnings:

  - You are about to drop the `Instansi` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `updatedAt` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_recipientId_fkey";

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "updatedAt" SET NOT NULL;

-- DropTable
DROP TABLE "Instansi";

-- CreateTable
CREATE TABLE "Agency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
