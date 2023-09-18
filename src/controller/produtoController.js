import mysql from 'mysql2/promise'
import { Router } from "express";
import { teste, cadastrarDetalhes, cadastrarProduto, cadastrarImagens } from '../repository/produtoRepository.js';

const produtoEndpoints = Router();

let variavel = ''

produtoEndpoints.post('/detalhes', async (req, resp) => {
    const resposta = {
        intensidade: req.body.intensidade,
        docura: req.body.docura,
        acidez: req.body.acidez,
        torra: req.body.torra,
        descricao: req.body.descricao,
        marca: req.body.marca,
        peso: req.body.peso,
        alergia: req.body.alergia,
        dimensoes: req.body.dimensoes
    };

    const idDetalhe = await cadastrarDetalhes(resposta);
    const json = {
        id: idDetalhe
    }

    variavel = idDetalhe;

    resp.json(json);
})

produtoEndpoints.post('/produto', async (req, resp) => {
    const info = {
            idAdm: req.body.idAdm,
            idCategoria: req.body.idCategoria,
            nome: req.body.nome,
            preco: req.body.preco,
            promocional: req.body.promocional,
            disponivelAssinatura: req.body.disponivelAssinatura,
            estoque: req.body.estoque,
        };
    
    const id = variavel;
    cadastrarProduto(id, info);
})

produtoEndpoints.post('/imagem', async (req, resp) => {
    
})

export default produtoEndpoints;