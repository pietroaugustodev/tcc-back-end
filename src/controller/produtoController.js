import mysql from 'mysql2/promise'
import { Router } from "express";
import { teste, cadastrarDetalhes, cadastrarProduto, cadastrarImagens, deletar } from '../repository/produtoRepository.js';

const produtoEndpoints = Router();

// produtoEndpoints.post('/detalhes', async (req, resp) => {
//     const resposta = {
//         intensidade: req.body.intensidade,
//         docura: req.body.docura,
//         acidez: req.body.acidez,
//         torra: req.body.torra,
//         descricao: req.body.descricao,
//         marca: req.body.marca,
//         peso: req.body.peso,
//         alergia: req.body.alergia,
//         dimensoes: req.body.dimensoes
//     };

//     const idDetalhe = await cadastrarDetalhes(resposta);
//     const json = {
//         id: idDetalhe
//     }

//     resp.json(json);
// })

// produtoEndpoints.post('/produto', async (req, resp) => {
//     const info = {
//             idAdm: req.body.idAdm,
//             idCategoria: req.body.idCategoria,
//             nome: req.body.nome,
//             preco: req.body.preco,
//             promocional: req.body.promocional,
//             disponivelAssinatura: req.body.disponivelAssinatura,
//             estoque: req.body.estoque
//         };
        
//     const cadastro = await cadastrarProduto(info);
//     resp.send(cadastro);
// })

produtoEndpoints.post('/imagem', async (req, resp) => {
    
})


produtoEndpoints.post('/produto', async (req, resp) => {
    const infoDetalhes = {
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

    const idDetalhe = await cadastrarDetalhes(infoDetalhes);
    
    const infoProduto = {
            idDetalhe: idDetalhe,
            idAdm: req.body.idAdm,
            idCategoria: req.body.idCategoria,
            nome: req.body.nome,
            preco: req.body.preco,
            promocional: req.body.promocional,
            disponivelAssinatura: req.body.disponivelAssinatura,
            estoque: req.body.estoque
        };
        
    const cadastro = await cadastrarProduto(infoProduto);
    resp.send(cadastro);
});

produtoEndpoints.delete('/deletar/:id', async (req, resp) => {
    try{
        const {id} = req.params
        if(!id || id === 0)
            throw new Error('Id não identificado ou inválido')

        const resposta = await deletar(id)

        if(resposta !== 1)
            throw new Error('Não foi possivel excluir')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


export default produtoEndpoints;
