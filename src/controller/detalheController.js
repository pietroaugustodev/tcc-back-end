import mysql from 'mysql2/promise'
import { Router } from "express";
import { encontrarDetalheID } from '../repository/detalheRepository.js';

const detalheEndpoint = Router();

detalheEndpoint.get('/encontrarDetalheID/:id', async (req, resp) => {
    const id = req.params.id;

    const resposta = await encontrarDetalheID(id);
    resp.send(resposta);

})

export default detalheEndpoint;