import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createIngresso = async (body) =>{
    try {
        const ingressoService = await prisma.ingresso.create({
            data: {
                cpf: body.cpf,
                nome: body.nome,
                data: body.data,
                valor: body.valor,
                quantidade: body.quantidade
            }
        });

        return ingressoService;
    } catch (error) {
        return { message: error.message }
    }
}

const findAllIngressosById = async (cpf) => prisma.ingresso.findMany({where: {cpf: cpf.cpf}});

const preencheIngresso = async (body) => {
    try {
        const ingressoPreenchidoService = await prisma.ingressoPreenchido.create({
            data: {
                ingressoId: body.ingressoId,
                cpf: body.cpf,
                nome: body.nome,
                dataNascimento: body.dataNascimento,
            }
        });

        return ingressoPreenchidoService;
    } catch (error) {
        return { message: error.message }
    }
}

export default {
    findAllIngressosById,
    createIngresso,
    preencheIngresso,
}