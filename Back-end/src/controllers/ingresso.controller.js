import ingressoService from '../services/ingresso.service.js';

const create = async (req, res) =>{
    try {
        const { cpf, nome, valor, data, quantidade } = req.body;

        if(!cpf || !nome || !valor || !data || !quantidade ){
            return res.status(400).json({message: 'Preencha todos os campos'});
        }
    
        const ingresso = await ingressoService.createIngresso(req.body);
    
        if(!ingresso){
            return res.status(400).json({message: 'Ingresso não criado'});
        }
    
        return res.status(201).send({
            message: 'Ingresso criado com sucesso',
            ingresso: ingresso,
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const findAll = async (req, res) => {
    try {
        const cpf = req.params;

        if(!cpf){
            return res.status(400).json({message: 'Preencha todos os campos'});
        }

        const ingresso = await ingressoService.findAllIngressosById(cpf);

        if(!ingresso) {
            return res.status(400).json({message: 'Ingresso não encontrado'});
        }

        if(ingresso.length === 0){
            return res.status(400).json({message: 'Ingresso não encontrado'});
        }

        return res.status(200).send({
            message: 'Ingresso encontrado com sucesso',
            ingresso: ingresso,
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const preencheIngresso = async (req, res) => {
    try {
        const { cpf, nome, dataNascimento, ingressoId } = req.body;

        if(!dataNascimento || !nome || !ingressoId || !cpf){
            return res.status(400).json({message: 'Preencha todos os campos'});
        }

        const ingressoPreenchido = await ingressoService.preencheIngresso(req.body);

        if(!ingressoPreenchido){
            return res.status(400).json({message: 'Ingresso não criado'});
        }

        return res.status(201).send({
            message: 'Ingresso preenchido com sucesso',
            ingresso: ingressoPreenchido,
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const editaIngressoPreenchido = async (req, res) => {
    try {
        const {cpf, nome, dataNascimento, idIngresso, preenchido} = req.body;

        if(!cpf || !nome || !dataNascimento || !idIngresso || !preenchido) {
            return res.status(400).json({message: 'Preencha todos os campos'});
        }

        const editIngresso = await ingressoService.editaIngressoPreenchidoService(req.body);

        if(!editIngresso) {
            return res.status(400).json({message: 'Ingresso não criado'});
        }

        return res.status(201).send({
            message: 'Ingresso editado com sucesso',
            ingresso: editIngresso,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const buscaIngressoPreenchido = async (req, res) => {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: 'Preencha todos os campos'});
        }

        const ingresso = await ingressoService.getIngressoPreenchido(id);

        if(!ingresso) {
            return res.status(400).json({message: 'Ingresso não encontrado'});
        }

        if(ingresso.length === 0){
            return res.status(400).json({message: 'Ingresso não encontrado'});
        }

        return res.status(200).send({
            message: 'Ingresso encontrado com sucesso',
            ingresso: ingresso,
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const editaIngresso = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
 
        if(!status || !id){
            return res.status(400).json({message: 'Preencha todos os campos'});
        }

        const editaStatus = await ingressoService.editaStatusIngresso(status, id);

        if(!editaStatus) {
            return res.status(400).json({message: 'Ingresso não encontrado'});
        }

        return res.status(200).send({
            message: 'Ingresso atualizado com sucesso',
            ingresso: editaStatus,
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export default {
    create,
    findAll,
    preencheIngresso,
    editaIngressoPreenchido,
    buscaIngressoPreenchido,
    editaIngresso,
}