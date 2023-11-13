import {Router } from "express";
import { procurarAssinatura, novaAssinatura, inserirProdutosAssinatura, procurarAssinaturaId, verificarAssinatura, cancelarAssinatura, cancelarAssinaturaItens } from "../repository/assinaturaRepository.js";

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

assinaturaEndpoints.get('/procurar-assinatura/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const resposta = await procurarAssinaturaId(id);
        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({
            erro: error.message
        })
    }
});

assinaturaEndpoints.get('/verificar-assinatura/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const resposta = await verificarAssinatura(id);
        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({
            erro: error.message
        })
    }
})

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


// DELETANDO

assinaturaEndpoints.delete('/cancelar-assinatura/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const respostaItens = await cancelarAssinaturaItens(id);
        const resposta = await cancelarAssinatura(id);

        resp.send({
            itens: respostaItens,
            assinatura: resposta
        })

    } catch (error) {
        resp.status(500).send({
            erro: error.message
        })
    }
})

export default assinaturaEndpoints;