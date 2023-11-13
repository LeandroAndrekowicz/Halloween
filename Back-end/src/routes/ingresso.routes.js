import Express from "express";  
import ingressoController from '../controllers/ingresso.controller.js'

const router = Express.Router();

router.post('/create/ingresso', ingressoController.create);

router.get('/findAll/ingresso/:cpf', ingressoController.findAll);

export default router;