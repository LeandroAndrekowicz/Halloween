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
                quantidade: body.quantidade,
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
                preenchido: body.preenchido
            }
        });

        return ingressoPreenchidoService;
    } catch (error) {
        return { message: error.message }
    }
}

const editaIngressoPreenchidoService = async (body) => {
    try {
        const editaIngressoPreenchido = await prisma.ingressoPreenchido.update(({
            where: {
                ingressoId: body.id
            }, 
            data: {
                nome: body.nome, 
                cpf: body.cpf, 
                dataNascimento: 
                body.dataNascimento
            }
        }))

        return editaIngressoPreenchido;

    } catch (error) {
        return { message: error.message }
    }
}

const getIngressoPreenchido = async (id) => prisma.ingressoPreenchido.findMany({ where: {ingressoId: id}})

const editaStatusIngresso = async(status, id) => prisma.ingresso.update({ where: { id: id }, data: {complete: status}});

export default {
    findAllIngressosById,
    createIngresso,
    preencheIngresso,
    editaIngressoPreenchidoService, 
    getIngressoPreenchido,
    editaStatusIngresso,
}