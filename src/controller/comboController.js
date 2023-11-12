import {Router } from "express";
import { buscarCombos, buscarItensComboPorIdCombo, criarCombo } from "../repository/comboRepository.js";
import { BuscaDetalhesId, BuscaProdutoId, BuscarIdCategoria, BuscarImagens } from "../repository/produtoRepository.js";

const comboEndpoints = Router();


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