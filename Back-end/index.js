import express from 'express';
import ingressoRouter from './src/routes/ingresso.routes.js'
import cors from 'cors'

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(ingressoRouter);

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});