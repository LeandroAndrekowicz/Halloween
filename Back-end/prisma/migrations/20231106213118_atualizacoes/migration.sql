/*
  Warnings:

  - Added the required column `data` to the `ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `ingresso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingresso" ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "valor" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "ingressoPreenchido" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingressoPreenchido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingressoPreenchido_cpf_key" ON "ingressoPreenchido"("cpf");
