/*
  Warnings:

  - Made the column `cpf` on table `ingressoPreenchido` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `ingressoPreenchido` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "ingresso_cpf_key";

-- DropIndex
DROP INDEX "ingressoPreenchido_cpf_key";

-- AlterTable
ALTER TABLE "ingressoPreenchido" ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "nome" SET NOT NULL;
