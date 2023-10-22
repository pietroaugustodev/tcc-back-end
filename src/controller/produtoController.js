import { Router } from "express";
import { cadastrarDetalhes, cadastrarProduto, cadastrarImagens, BuscarImagens, deletarProduto, deletarDetalhes, BuscarProdutos, BuscarIdCategoria, BuscarIdAdm, BuscaProdutoId,BuscaDetalhesId, AlterarDetalhesProduto, AlterarProduto, deletarImagem, deletarImagensPorProduto, buscarTodosAdms, buscarCategorias, filtrarProdutosPorAdm, filtrarProdutosPorCategorias,ordenarProdutosPorEstoqueDecrescente, ordenarProdutosPorEstoqueCrescente, ordenarProdutosPorPrecoDecrescente, ordenarProdutosPorPrecoPromocionalDecrescente, filtrarProdutosPorDisponibilidadeAssinatura, filtrarProdutosPorIdOuNome } from '../repository/produtoRepository.js';


const produtoEndpoints = Router();


// Cadastrando
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
    if (infoProduto.preco == 0) throw new Error('Insira preço diferente de 0!');
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
            const respImagens = await BuscarImagens(resposta[cont].id)
            resposta[cont].imagem = respImagens[0].caminho
        }
        
        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/adms', async (req, resp) => {
    try{
        const resposta = await buscarTodosAdms()    

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/categorias', async (req, resp) => {
    try{
        const resposta = await buscarCategorias()

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/filtro/produtos/adm/:id', async (req, resp) =>{
    try{
        const {id} = req.params

        let produtosFiltrados = await filtrarProdutosPorAdm(id)
        for(let cont = 0; cont < produtosFiltrados.length; cont ++){
            produtosFiltrados[cont].admin = await BuscarIdAdm(produtosFiltrados[cont].id_admin) 
            produtosFiltrados[cont].categoria = await BuscarIdCategoria(produtosFiltrados[cont].id_categoria)
            const respImagens = await BuscarImagens(produtosFiltrados[cont].id)
            produtosFiltrados[cont].imagem = respImagens[0].caminho
        }
        resp.send(produtosFiltrados)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/filtro/produtos/categorias/:id', async (req, resp) => {
    try {
        const {id} = req.params

        let produtosFiltrados = await filtrarProdutosPorCategorias(id)

        for(let cont = 0; cont < produtosFiltrados.length; cont ++){
            produtosFiltrados[cont].admin = await BuscarIdAdm(produtosFiltrados[cont].id_admin) 
            produtosFiltrados[cont].categoria = await BuscarIdCategoria(produtosFiltrados[cont].id_categoria)
            const respImagens = await BuscarImagens(produtosFiltrados[cont].id)
            produtosFiltrados[cont].imagem = respImagens[0].caminho
        }

        resp.send(produtosFiltrados)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/filtro/produtos/ordenar/:coluna', async (req, resp) => {
    try{
        const {coluna} = req.params
        let resposta = []

        if(coluna === 'qtd_estoque desc'){
            resposta = await ordenarProdutosPorEstoqueDecrescente()
        }
        else if(coluna === 'qtd_estoque'){
            resposta = await ordenarProdutosPorEstoqueCrescente()
        }
        else if(coluna === 'vl_preco'){
            resposta = await ordenarProdutosPorPrecoDecrescente()
        }
        else if(coluna === 'vl_preco_promocional'){
            resposta = await ordenarProdutosPorPrecoPromocionalDecrescente()
        }
        for(let cont = 0; cont < resposta.length; cont ++){
            resposta[cont].admin = await BuscarIdAdm(resposta[cont].id_admin) 
            resposta[cont].categoria = await BuscarIdCategoria(resposta[cont].id_categoria)
            const respImagens = await BuscarImagens(resposta[cont].id)
            resposta[cont].imagem = respImagens[0].caminho
        }
        resp.send(resposta)
    }   
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/filtro/produtos/disponivelAssinatura/:valor', async (req, resp) => {
    try{
        const {valor} = req.params

        let valorBoolean = ''
        if(valor === 'false'){
            valorBoolean = Boolean(!valor)
          }
          else{
            valorBoolean = Boolean(valor)
        }
        
        const produtosFiltrados = await filtrarProdutosPorDisponibilidadeAssinatura(valorBoolean)
        for(let cont = 0; cont < produtosFiltrados.length; cont ++){
            produtosFiltrados[cont].admin = await BuscarIdAdm(produtosFiltrados[cont].id_admin) 
            produtosFiltrados[cont].categoria = await BuscarIdCategoria(produtosFiltrados[cont].id_categoria)
            const respImagens = await BuscarImagens(produtosFiltrados[cont].id)
            produtosFiltrados[cont].imagem = respImagens[0].caminho
        }

        resp.send(produtosFiltrados)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/filtro/produtos/pesquisa/:valor', async (req, resp) => {
    try{
        const {valor} = req.params

        const resposta = await filtrarProdutosPorIdOuNome(valor)

        resp.send(resposta)

    }
    catch(err){

    }
})

// produtoEndpoints.get('/filtro/produtos/ordenar/:coluna', async (req, resp) => {
//     try{
//         const {coluna} = req.params


//         const resposta = await ordenarProdutosPorColuna(coluna)
        
//         resp.send(resposta)
//     }   
//     catch(err){
//         resp.status(500).send({
//             erro: err.message
//         })
//     }
// })













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
        const {idProduto: id_produto, idDetalhe: id_detalhe }= req.params
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
        console.log(infoDetalhes.descricao);
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
        const {deletar} = req.body
        for(let item of deletar){
            console.log(item);
            const resposta = await deletarImagem(item)
            if(resposta !== 1)
                throw new Error('Não foi possivel alterar a imagem de id ' + item)
        }

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
        const {idDetalhe, idProduto} = req.body

        if(!idProduto || idProduto === 0 || isNaN(idProduto))
            throw new Error('Id do produto não identificado ou inválido')
        if(!idDetalhe || idDetalhe === 0 || isNaN(idDetalhe))
            throw new Error('id do detalhe não identificado ou inválido')

        const respostaImagens = await deletarImagensPorProduto(idProduto)
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