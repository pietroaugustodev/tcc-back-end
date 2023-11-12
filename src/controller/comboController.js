import {Router } from "express";
import { adicionarItemCombo, buscarCombos, buscarItensComboPorIdCombo, criarCombo } from "../repository/comboRepository.js";
import { BuscaDetalhesId, BuscaProdutoId, BuscarIdCategoria, BuscarImagens } from "../repository/produtoRepository.js";

const comboEndpoints = Router();


comboEndpoints.post('/combo', async (req, resp) => {
    try{
        const combo = req.body

        if(!combo.nome)
            throw new Error('O nome do combo é obrigatório.')
        if(!combo.preco)
            throw new Error('O preço do combo é obrigatório.')

        const resposta = await criarCombo(combo)
        
        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


comboEndpoints.post('/combo/item', async (req, resp) => {
    try{
        const item = req.body

        if(!item.id_combo || isNaN(item.id_combo))
            throw new Error('ID do combo não definido ou em formato errado.')
        if(!item.id_produto || isNaN(item.id_produto))
            throw new Error('ID do produto não definido ou em formato errado.')

        const resposta = await adicionarItemCombo(item)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})
























// Buscando


comboEndpoints.get('/abcd', async (req, resp) => {
    const resposta = await criarCombo();
    resp.send(resposta);
})

comboEndpoints.get('/combos', async (req, resp) => {
    try{
        let combos = await buscarCombos()

        for(let cont= 0; cont < combos.length; cont++){
            combos[cont].produtos = await buscarItensComboPorIdCombo(combos[cont].id)
            let verificacaoEstoques = []

            for(let conta = 0; conta < combos[cont].produtos.length; conta++){

                combos[cont].produtos[conta].produto = await BuscaProdutoId(combos[cont].produtos[conta].id_produto)
                verificacaoEstoques[conta] = combos[cont].produtos[conta].produto.estoque
                combos[cont].produtos[conta].produto.categoria = await BuscarIdCategoria(combos[cont].produtos[conta].produto.id_categoria)

                const detalhesProdutos = await BuscaDetalhesId(combos[cont].produtos[conta].produto.id)
                combos[cont].produtos[conta].produto.detalhes = detalhesProdutos

                const respImagens = await BuscarImagens(combos[cont].produtos[conta].produto.id)
                combos[cont].produtos[conta].produto.imagem = respImagens[0].caminho
            }

            if(verificacaoEstoques[0] === 0 || verificacaoEstoques[1] === 0 || verificacaoEstoques[2] === 0 || verificacaoEstoques[3] === 0){
                combos = combos.filter(combo => combo.id !== combos[cont].id)
                --cont
            }
        }


        resp.send(combos)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


export default comboEndpoints;