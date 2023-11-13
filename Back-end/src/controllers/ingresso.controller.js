import ingressoService from '../services/ingresso.service.js';

const create = async (req, res) =>{
    try {
        const { cpf, nome, valor, data } = req.body;

        if(!cpf || !nome || !valor || !data){
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

export default {
    create,
    findAll,
}