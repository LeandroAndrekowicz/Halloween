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
            }
        });

        return ingressoService;
    } catch (error) {
        return { message: error.message }
    }
}

const findAllIngressosById = async (cpf) => prisma.ingresso.findMany({where: {cpf: cpf.cpf}});

export default {
    findAllIngressosById,
    createIngresso,
}