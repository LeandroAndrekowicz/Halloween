-- AlterTable
ALTER TABLE "ingresso" ALTER COLUMN "quantidade" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ingressoPreenchido" ADD COLUMN     "quantidade" INTEGER NOT NULL DEFAULT 1;
