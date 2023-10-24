import {Router } from "express";
import { procurarAssinatura } from "../repository/assinaturaRepository.js";

const assinaturaEndpoints = Router();

assinaturaEndpoints.get('/listar-assinaturas', async (req, resp) => {
    try {
        const resposta = await procurarAssinatura();
        resp.send(resposta);
    } catch (error) {
        resp.status(500).send({
            erro: error.message
        })
    }
})

assinaturaEndpoints.get('/listar-assinaturas/imagem', async (req, resp) => {
    try {
        const resposta = await procurarAssinatura();
        resp.send(resposta);
    } catch (error) {
        resp.status(500).send({
            erro: error.message
        })
    }
})

export default assinaturaEndpoints;