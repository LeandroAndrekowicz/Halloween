/*
  Warnings:

  - Added the required column `ingressoId` to the `ingressoPreenchido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingressoPreenchido" ADD COLUMN     "ingressoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ingressoPreenchido" ADD CONSTRAINT "ingressoPreenchido_ingressoId_fkey" FOREIGN KEY ("ingressoId") REFERENCES "ingresso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
