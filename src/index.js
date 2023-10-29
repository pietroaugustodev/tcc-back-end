import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import admEndpoints from './controller/admController.js';
import clienteEndpoints from './controller/clienteController.js';
import produtoEndpoints from './controller/produtoController.js';
import comboEndpoints from './controller/comboController.js';
import assinaturaEndpoints from './controller/assinaturaController.js';

const server = express()


server.use(cors())
server.use(express.json())
server.use(admEndpoints)
server.use(clienteEndpoints) 
server.use(produtoEndpoints)
server.use(comboEndpoints)
server.use(assinaturaEndpoints)
server.listen(process.env.PORT, 
    () => console.log('API online na porta ' + process.env.PORT)); 