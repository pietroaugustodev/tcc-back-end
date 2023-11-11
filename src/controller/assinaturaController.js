import {Router } from "express";
import { procurarAssinatura, novaAssinatura, inserirProdutosAssinatura } from "../repository/assinaturaRepository.js";

const assinaturaEndpoints = Router();

// Buscando

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
});

// Inserindo

assinaturaEndpoints.post('/concluir-assinatura', async (req, resp) => {
    try {
        const info = req.body;
        const resposta = await novaAssinatura(info);
        resp.send(resposta);
        
    } catch (error) {
        resp.status(500).send({
            erro: error.message
        })
    }
});

assinaturaEndpoints.post('/concluir-assinatura/produtos', async (req, resp) => {
    try {
        const produto = req.body;
        const resposta = await inserirProdutosAssinatura(produto);
        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({
            erro: error.message
        })
    }
});

export default assinaturaEndpoints;