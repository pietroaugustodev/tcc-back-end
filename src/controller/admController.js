import { Router } from 'express'
import { AlterarDetalhesProduto, AlterarProduto, BuscaDetalhesId, BuscaProdutoId, BuscarProdutos, Login } from '../repository/admRepository.js';


const admEndpoints = Router();

admEndpoints.post('/adm', async (req, resp) => {
    try{
        const { email, senha } = req.body
        if(!email)
            throw new Error('E-mail não identificado')
        if(!senha)
            throw new Error('Senha não identificada')

        const resposta = await Login(email, senha)
        if(!resposta)
            throw new Error('Sem autorização')
        resp.send(resposta)
    }
    catch(err){
        resp.status(401).send({
            erro: err.message
        })
    }
}) 

admEndpoints.get('/produtos', async (req, resp) => {
    try{
        const resposta = await BuscarProdutos()

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

admEndpoints.get('/produto/:id', async (req, resp) => {
    try{
        const {id} = req.params
        if(!id)
            throw new Error('Id produto não identificado')

        const resposta = await BuscaProdutoId(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

admEndpoints.get('/detalhes/:id', async (req, resp) => {
    try{
        const {id} = req.params
        if(!id)
            throw new Error('Id detalhe não identificado')

        const resposta = await BuscaDetalhesId(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

admEndpoints.put('/:id/produto', async (req, resp) =>{
    try{
        const produto = req.body
        const {id}= req.params
        if(!produto.nome)
            throw new Error('Nome do produto não definido')
        if(!produto.preco)
            throw new Error('Preço obrigatório')
        if(!produto.id_admin)
            throw new Error('ADM não selecionado')
        if(!produto.id_categoria)
            throw new Error('Categoria obrigatória')
        if(!produto.estoque)
            throw new Error('Estoque obrigatório')
        if(!produto.assinatura)
            throw new Error('Assinatura obrigatório')

        const resposta = await AlterarProduto(produto, id)

        if(resposta !== 1)
            throw new Error('Não foi possivel alterar')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

admEndpoints.put('/produto/:id/detalhes', async (req, resp) => {
    try{
        const detalhes = req.body
        const {id} = req.params

        if(!detalhes.intensidade)
            throw new Error('Intensidade obrigatório')
        if(!detalhes.docura)
            throw new Error('Doçura obrigatório')
        if(!detalhes.acidez)
            throw new Error('Acidez obrigatorio')
        if(!detalhes.torra)
            throw new Error('Torra obrigatório')
        if(!detalhes.produto)
            throw new Error('Detalhes do produto obrigatório')
        if(!detalhes.marca)
            throw new Error('Marca obrigatório')
        if(!detalhes.peso)
            throw new Error('Peso obrigatório')
        if(!detalhes.dimensoes)
            throw new Error('As dimensões do produto são obrigatório')

        const resposta = await AlterarDetalhesProduto(detalhes, id)

        if(resposta !== 1) 
            throw new Error('Os detalhes pode ser alterado')
        
        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})
export default admEndpoints;