import { Router } from "express";
import { cadastrarDetalhes, cadastrarProduto, cadastrarImagens, BuscarImagens, deletarProduto, deletarDetalhes, AlterarImagens, BuscarProdutos, BuscarIdCategoria, BuscarIdAdm, BuscaProdutoId, deletarImagens, BuscaDetalhesId, AlterarDetalhesProduto, AlterarProduto } from '../repository/produtoRepository.js';

const produtoEndpoints = Router();

produtoEndpoints.post('/imagemproduto', async (req, resp) => {
    try {
        const infoImagem = {
            idProduto: req.body.idProduto,
            caminho: req.body.caminho
        }

        const cadastrar = cadastrarImagens(infoImagem);
        resp.send(cadastrar)
    } catch (error) {
        resp.status(500).send({
            erro: error.message
        })
    }
    
})


produtoEndpoints.post('/produto', async (req, resp) => {
    try {
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

    if (!infoProduto.nome) throw new Error('Por favor, selecione o nome do produto!');
    if (!infoDetalhes.peso) throw new Error('Por favor, selecione o peso do produto!');
    if (!infoProduto.estoque) throw new Error('Por favor, selecione a quantidade disponível no estoque!');
    if (!infoDetalhes.marca) throw new Error('Por favor, insira a marca do produto!');
    if (!infoProduto.preco) throw new Error('Por favor, selecione o preço do produto!');
    if (!infoDetalhes.dimensoes) throw new Error('Por favor, insira as dimensões do produto');
    if (!infoDetalhes.descricao) throw new Error('Por favor, insira uma descrição ao produto!');
    if (!infoDetalhes.alergia) throw new Error('Por favor, preencha o campo sobre alergias!');
    if (!infoProduto.idCategoria) throw new Error('Por favor, selecione a categoria!');
     
    const cadastro = await cadastrarProduto(infoProduto);
    resp.send(cadastro);
    } catch (error) {
        resp.status(500).send({
            erro: error.message
        })
    }
});

// Buscando

produtoEndpoints.get('/produtos', async (req, resp) => {
    try{
        const resposta = await BuscarProdutos()
        for(let cont = 0; cont < resposta.length; cont ++){
            resposta[cont].admin = await BuscarIdAdm(resposta[cont].id_admin) 
            resposta[cont].categoria = await BuscarIdCategoria(resposta[cont].id_categoria)
        }
        
        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

// Alterando

produtoEndpoints.get('/produto/:id', async (req, resp) => {
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

produtoEndpoints.get('/:id/imagens', async (req, resp) =>{
    try{
        const {id} = req.params
            if(!id || id === 0)
                throw new Error('Id não identificado ou indisponível')

        const resposta = await BuscarImagens(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/detalhes/:id', async (req, resp) => {
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

produtoEndpoints.put('/produto/:idProduto/detalhes/:idDetalhe', async (req, resp) =>{
    try{
        const {idProduto: id_produto, idDetalhe: id_detalhe }= Number(req.params)
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
    
        const respostaDetalhes = await AlterarDetalhesProduto(infoDetalhes, id_detalhe);
        if(respostaDetalhes !== 1)
            throw new Error('Não foi possivel alterar os detalhes do produto')

        const infoProduto = {
                idDetalhe: id_detalhe,
                idAdm: req.body.idAdm,
                idCategoria: req.body.idCategoria,
                nome: req.body.nome,
                preco: req.body.preco,
                promocional: req.body.promocional,
                disponivelAssinatura: req.body.disponivelAssinatura,
                estoque: req.body.estoque
            };
    
        if (!infoProduto.nome) throw new Error('Por favor, selecione o nome do produto!');
        if (!infoDetalhes.peso) throw new Error('Por favor, selecione o peso do produto!');
        if (!infoProduto.estoque) throw new Error('Por favor, selecione a quantidade disponível no estoque!');
        if (!infoDetalhes.marca) throw new Error('Por favor, insira a marca do produto!');
        if (!infoProduto.preco) throw new Error('Por favor, selecione o preço do produto!');
        if (!infoDetalhes.dimensoes) throw new Error('Por favor, insira as dimensões do produto');
        if (!infoDetalhes.descricao) throw new Error('Por favor, insira uma descrição ao produto!');
        if (!infoDetalhes.alergia) throw new Error('Por favor, preencha o campo sobre alergias!');
        if (!infoProduto.idCategoria) throw new Error('Por favor, selecione a categoria!');
         
        const respostaProduto = await AlterarProduto(infoProduto, id_produto);
        if(respostaProduto !== 1)
            throw new Error('Não foi possivel alterar o produto')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.put('/:id/imagens', async (req, resp) => {
    try{
        const { idProduto, caminho} = req.body;
        if(!idProduto || isNaN(idProduto) || idProduto === 0)
            throw new Error('Id do produto inválido ou indefinido')
        if(!caminho)
            throw new Error('Caminho indefinido')

        const resposta = await AlterarImagens(idProduto, caminho)

        if(resposta !== 1)
            throw new Error('Não foi possivel alterar as imagens')
        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


// Deletando

produtoEndpoints.delete('/deletar/produto', async (req, resp) => {
    try{
        const {idDetalhe, idProduto} = req.query
        console.log(idDetalhe);
        console.log(idProduto);
        if(!idProduto || idProduto === 0 || isNaN(idProduto))
            throw new Error('Id do produto não identificado ou inválido')
        if(!idDetalhe || idDetalhe === 0 || isNaN(idDetalhe))
            throw new Error('id do detalhe não identificado ou inválido')

        const respostaImagens = await deletarImagens(idProduto)
        const respostaDetalhes = await deletarDetalhes(idDetalhe)
        const respostaProduto = await deletarProduto(idProduto)

        if(respostaProduto !== 1)
            throw new Error('Não foi possivel excluir o produto')
        
        if(respostaDetalhes !== 1)
            throw new Error('Não foi possivel excluir os detalhes')

            
        if(respostaImagens !== 1)
            throw new Error('Não foi possivel excluir as imagens')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


export default produtoEndpoints;