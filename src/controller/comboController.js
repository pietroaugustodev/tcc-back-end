import {Router } from "express";
import { adicionarItemCombo, alterarCombo, alterarItemCombo, buscarComboPorIdCombo, buscarCombos, buscarCombosPorIdAdm, buscarCombosPorIdOuNome, buscarItensComboPorIdCombo, criarCombo, deletarComboPorIdCombo, deletarItensComboPorIdCombo, ordenarCombosPorPrecoMaiorAoMenor, ordenarCombosPorPrecoMenorAoMaior } from "../repository/comboRepository.js";
import { BuscaDetalhesId, BuscaProdutoId, BuscarIdAdm, BuscarIdCategoria, BuscarImagens } from "../repository/produtoRepository.js";

const comboEndpoints = Router();


comboEndpoints.post('/combo', async (req, resp) => {
    try{
        const combo = req.body

        if(!combo.id_admin || combo.id_admin === 0 || isNaN(combo.id_admin))
            throw new Error('ID adm não definido ou em formato errado')
        if(!combo.nome || combo.nome.length > 50)
            throw new Error('O nome do combo indefinido ou muito longo.')
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
    // const resposta = await criarCombo();
    resp.send(new Date());
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

comboEndpoints.get('/combos/adm', async (req, resp) => {
    try{
        let combos = await buscarCombos()

        for(let cont= 0; cont < combos.length; cont++){
            combos[cont].admin = await BuscarIdAdm(combos[cont].id_admin)
            combos[cont].produtos = await buscarItensComboPorIdCombo(combos[cont].id)

            for(let conta = 0; conta < combos[cont].produtos.length; conta++){

                combos[cont].produtos[conta].produto = await BuscaProdutoId(combos[cont].produtos[conta].id_produto)
                combos[cont].produtos[conta].produto.categoria = await BuscarIdCategoria(combos[cont].produtos[conta].produto.id_categoria)

                const detalhesProdutos = await BuscaDetalhesId(combos[cont].produtos[conta].produto.id)
                combos[cont].produtos[conta].produto.detalhes = detalhesProdutos

                const respImagens = await BuscarImagens(combos[cont].produtos[conta].produto.id)
                combos[cont].produtos[conta].produto.imagem = respImagens[0].caminho
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

comboEndpoints.get('/combo/:id', async (req, resp) => {
    try{
        const id = Number(req.params.id)

        let combo = await buscarComboPorIdCombo(id)
        combo.admin = await BuscarIdAdm(combo.id_admin)
        combo.produtos = await buscarItensComboPorIdCombo(combo.id)
        for(let conta = 0; conta < combo.produtos.length; conta++){

            combo.produtos[conta].produto = await BuscaProdutoId(combo.produtos[conta].id_produto)
            combo.produtos[conta].produto.categoria = await BuscarIdCategoria(combo.produtos[conta].produto.id_categoria)

            const detalhesProdutos = await BuscaDetalhesId(combo.produtos[conta].produto.id)
            combo.produtos[conta].produto.detalhes = detalhesProdutos

            const respImagens = await BuscarImagens(combo.produtos[conta].produto.id)
            combo.produtos[conta].produto.imagem = respImagens[0].caminho
        }

        resp.send(combo)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

comboEndpoints.get('/combos/adm/:idAdm', async (req, resp) => {
    try{
        const id = Number(req.params.idAdm)

        let combos = await buscarCombosPorIdAdm(id)
        for(let cont= 0; cont < combos.length; cont++){
            combos[cont].admin = await BuscarIdAdm(combos[cont].id_admin)
            combos[cont].produtos = await buscarItensComboPorIdCombo(combos[cont].id)

            for(let conta = 0; conta < combos[cont].produtos.length; conta++){
                combos[cont].produtos[conta].produto = await BuscaProdutoId(combos[cont].produtos[conta].id_produto)
                
                const respImagens = await BuscarImagens(combos[cont].produtos[conta].produto.id)
                combos[cont].produtos[conta].produto.imagem = respImagens[0].caminho
                
                combos[cont].produtos[conta].produto.categoria = await BuscarIdCategoria(combos[cont].produtos[conta].produto.id_categoria)

                const detalhesProdutos = await BuscaDetalhesId(combos[cont].produtos[conta].produto.id)
                combos[cont].produtos[conta].produto.detalhes = detalhesProdutos
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


comboEndpoints.get('/combos/ordenar/:campo', async (req, resp) => {
    try{
        const {campo} = req.params
        let combos = []

        if(campo === 'Preço (maior ao menor)')
            combos = await ordenarCombosPorPrecoMaiorAoMenor()
        else if(campo === 'Preço (menor ao maior)')
            combos = await ordenarCombosPorPrecoMenorAoMaior()

        for(let cont= 0; cont < combos.length; cont++){
            combos[cont].admin = await BuscarIdAdm(combos[cont].id_admin)
            combos[cont].produtos = await buscarItensComboPorIdCombo(combos[cont].id)

            for(let conta = 0; conta < combos[cont].produtos.length; conta++){
                combos[cont].produtos[conta].produto = await BuscaProdutoId(combos[cont].produtos[conta].id_produto)
                
                const respImagens = await BuscarImagens(combos[cont].produtos[conta].produto.id)
                combos[cont].produtos[conta].produto.imagem = respImagens[0].caminho
                
                combos[cont].produtos[conta].produto.categoria = await BuscarIdCategoria(combos[cont].produtos[conta].produto.id_categoria)

                const detalhesProdutos = await BuscaDetalhesId(combos[cont].produtos[conta].produto.id)
                combos[cont].produtos[conta].produto.detalhes = detalhesProdutos
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


comboEndpoints.get('/combos/pesquisa/:valor', async (req, resp) => {
    try{
        const {valor} = req.params

        let combos = await buscarCombosPorIdOuNome(valor)
        for(let cont= 0; cont < combos.length; cont++){
            combos[cont].admin = await BuscarIdAdm(combos[cont].id_admin)
            combos[cont].produtos = await buscarItensComboPorIdCombo(combos[cont].id)

            for(let conta = 0; conta < combos[cont].produtos.length; conta++){
                combos[cont].produtos[conta].produto = await BuscaProdutoId(combos[cont].produtos[conta].id_produto)
                
                const respImagens = await BuscarImagens(combos[cont].produtos[conta].produto.id)
                combos[cont].produtos[conta].produto.imagem = respImagens[0].caminho
                
                combos[cont].produtos[conta].produto.categoria = await BuscarIdCategoria(combos[cont].produtos[conta].produto.id_categoria)

                const detalhesProdutos = await BuscaDetalhesId(combos[cont].produtos[conta].produto.id)
                combos[cont].produtos[conta].produto.detalhes = detalhesProdutos
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
























// Deletando

comboEndpoints.delete('/combo/:id', async (req, resp) => {
    try{
        const {id} = req.params

        const resposta = await deletarComboPorIdCombo(id)
        if(resposta !== 1)
            throw new Error('Não foi possível excluir o combo')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

comboEndpoints.delete('/combo/itens/:id', async (req, resp) => {
    try{
        const {id} = req.params

        const resposta = await deletarItensComboPorIdCombo(id)
        if(resposta === 0)
            throw new Error('Não foi possível excluir os itens do combo')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})



















// Alterando

comboEndpoints.put('/combo/:id', async (req, resp) => {
    try{
        const id = Number(req.params.id)
        const combo = req.body
        
        if(!combo.id_admin || isNaN(combo.id_admin) || combo.id_admin === 0)
            throw new Error('ID adm não definido')
        if(!combo.nome || combo.nome.length > 50)
            throw new Error('É obrigatório o combo ter um nome')
        if(!combo.preco)
            throw new Error('É obrigatorio o combo ter um preco')

        const resposta = await alterarCombo(id, combo)
        if(resposta !== 1)
            throw new Error('Não foi possível alterar o combo')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


comboEndpoints.put('/combo/item/:id', async (req, resp) => {
    try{
        const id = Number(req.params.id)
        const item = req.body

        if(!item.id_produto || item.id_produto === 0 || isNaN(item.id_produto))
            throw new Error('ID do produto indefinido')
        if(!item.id_combo || item.id_combo === 0 || isNaN(item.id_combo))
            throw new Error('ID combo indefinido')

        const resposta = await alterarItemCombo(id, item)
        if(resposta !== 1)
            throw new Error('Não foi possivel alterar o item')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

export default comboEndpoints;