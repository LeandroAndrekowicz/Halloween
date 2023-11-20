/*
  Warnings:

  - Added the required column `quantidade` to the `ingresso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingresso" ADD COLUMN "quantidade" INTEGER;

-- AlterTable
ALTER TABLE "ingressoPreenchido" ALTER COLUMN "cpf" DROP NOT NULL,
ALTER COLUMN "nome" DROP NOT NULL,
ALTER COLUMN "dataNascimento" DROP NOT NULL;  