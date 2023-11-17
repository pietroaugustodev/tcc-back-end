import {Router } from "express";
import { procurarAssinatura, novaAssinatura, inserirProdutosAssinatura, procurarAssinaturaId, verificarAssinatura, cancelarAssinatura, cancelarAssinaturaItens, buscarAssinaturas, buscarAssinaturasPorClienteOuId, buscarAssinaturasPorStatus, alterandoStatusAssinatura } from "../repository/assinaturaRepository.js";

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


assinaturaEndpoints.get('/assinaturas', async (req, resp) => {
    try{
        const assinaturas = await buscarAssinaturas()
        let assinaturasFiltradas = assinaturas.filter(assinatura => assinatura.situacao !== 'Cancelado')

        resp.send(assinaturasFiltradas)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

assinaturaEndpoints.get('/assinaturas/pesquisa/:pesquisa', async (req, resp) => {
    try{
        const {pesquisa} = req.params

        const assinaturas = await buscarAssinaturasPorClienteOuId(pesquisa)

        resp.send(assinaturas)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


assinaturaEndpoints.get('/assinaturas/status/:status', async (req, resp) => {
    try{
        const {status} = req.params 

        const assinaturas = await buscarAssinaturasPorStatus(status)

        resp.send(assinaturas)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
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


// Deletando

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


// Alterando

assinaturaEndpoints.put('/assinatura/status/:id/:status', async (req, resp) => {
    try {
        const id = Number(req.params.id)
        const {status} = req.params

        if(isNaN(id) || !id)
            throw new Error('ID indefinido ou em tipo inválido')

        const resposta = await alterandoStatusAssinatura(id, status)
        if(resposta !== 1)
            throw new Error('Não foi possível alterar o status')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

assinaturaEndpoints.get('/assinaturas/ordenar/:ordem', async (req, resp) => {
    try{
        
    }
    catch(err){
        resp.status(500).send({
           erro: err.message
        })
    }
} )

export default assinaturaEndpoints;