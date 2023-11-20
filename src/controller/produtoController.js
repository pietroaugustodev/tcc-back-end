import { Router } from "express";
import { cadastrarDetalhes, cadastrarProduto, cadastrarImagens, BuscarImagens, deletarProduto, deletarDetalhes, BuscarProdutos, BuscarIdCategoria, BuscarIdAdm, BuscaProdutoId,BuscaDetalhesId, AlterarDetalhesProduto, AlterarProduto, deletarImagem, deletarImagensPorProduto, buscarTodosAdms, buscarCategorias, filtrarProdutosPorAdm, filtrarProdutosPorCategorias,ordenarProdutosPorEstoqueDecrescente, ordenarProdutosPorEstoqueCrescente, ordenarProdutosPorPrecoDecrescente, ordenarProdutosPorPrecoPromocionalDecrescente, filtrarProdutosPorDisponibilidadeAssinatura, filtrarProdutosPorIdOuNome, buscarProdutosPorMarca, buscarProdutoPorDetalhes } from '../repository/produtoRepository.js';
import { buscarIdsComboPorIdProduto, deletarComboPorIdCombo, deletarItensComboPorIdCombo } from "../repository/comboRepository.js";


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

        let infoProduto = {
            idAdm: req.body.idAdm,
            idCategoria: req.body.idCategoria,
            nome: req.body.nome,
            preco: req.body.preco,
            promocional: req.body.promocional,
            disponivelAssinatura: req.body.disponivelAssinatura,
            estoque: req.body.estoque
        };

        if (!infoDetalhes.peso) throw new Error('Por favor, selecione o peso do produto!');
        if (!infoProduto.nome) throw new Error('Por favor, selecione o nome do produto!');
        if (!infoProduto.estoque) throw new Error('Por favor, selecione a quantidade disponível no estoque!');
        if (!infoDetalhes.marca) throw new Error('Por favor, insira a marca do produto!');
        if (!infoProduto.preco) throw new Error('Por favor, selecione o preço do produto!');
        if (infoProduto.preco == 0) throw new Error('Insira preço diferente de 0!');
        if (!infoDetalhes.dimensoes) throw new Error('Por favor, insira as dimensões do produto');
        if (!infoDetalhes.descricao) throw new Error('Por favor, insira uma descrição ao produto!');
        if (!infoDetalhes.alergia) throw new Error('Por favor, preencha o campo sobre alergias!');
        if (!infoProduto.idCategoria) throw new Error('Por favor, selecione a categoria!');
        
        const idDetalhe = await cadastrarDetalhes(infoDetalhes);
        infoProduto.idDetalhe = idDetalhe   

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
        let resposta = await BuscarProdutos();
        for(let cont = 0; cont < resposta.length; cont ++){
            resposta[cont].admin = await BuscarIdAdm(resposta[cont].id_admin) 
            let infoCategoria = await BuscarIdCategoria(resposta[cont].id_categoria) 
            resposta[cont].categoria = infoCategoria.categoria 
            const detalhesProdutos = await BuscaDetalhesId(resposta[cont].id_detalhe)
            resposta[cont].detalhes = detalhesProdutos
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

produtoEndpoints.get('/produtos/marca', async (req, resp) => {
    try {
        const {marca, categoria} = req.query
        let idCategoria = 0
        if(categoria === 'cafeemgraos')
            idCategoria = 1
        else if(categoria === 'cafeempo')
            idCategoria = 2
        else if(categoria === 'cafeteiras')
            idCategoria = 3
        else if(categoria === 'filtros')
            idCategoria = 5
        else if(categoria === 'capsulas')
            idCategoria = 6
        else if(categoria === 'moedores')
            idCategoria = 7
        else if(categoria === 'acessorios')
            idCategoria = 8

        let produtos = []
        let detalhesProdutosMarca = await buscarProdutosPorMarca(marca)
        

        for(let cont = 0; cont < detalhesProdutosMarca.length ; cont++){
            let produto = await buscarProdutoPorDetalhes(detalhesProdutosMarca[cont].id_detalhe)
            produto.detalhes = detalhesProdutosMarca[cont]
            let infoCategoria = await BuscarIdCategoria(produto.id_categoria) 
            produto.categoria = infoCategoria.categoria 
            const respImagens = await BuscarImagens(produto.id)
            produto.imagem = respImagens[0].caminho
            produtos[cont] = produto
        }
        const produtosFiltradosPorCategoria = produtos.filter(item => item.id_categoria === idCategoria)


        resp.send(produtosFiltradosPorCategoria)
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
            let infoCategoria = await BuscarIdCategoria(produtosFiltrados[cont].id_categoria) 
            produtosFiltrados[cont].categoria = infoCategoria.categoria 
            const detalhesProdutos = await BuscaDetalhesId(produtosFiltrados[cont].id_detalhe)
            produtosFiltrados[cont].detalhes = detalhesProdutos
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
            let infoCategoria = await BuscarIdCategoria(produtosFiltrados[cont].id_categoria) 
            produtosFiltrados[cont].categoria = infoCategoria.categoria 
            const detalhesProdutos = await BuscaDetalhesId(produtosFiltrados[cont].id_detalhe)
            produtosFiltrados[cont].detalhes = detalhesProdutos
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
        else if(coluna === 'vl_preco desc'){
            resposta = await ordenarProdutosPorPrecoDecrescente()
        }
        else if(coluna === 'vl_preco_promocional desc'){
            resposta = await ordenarProdutosPorPrecoPromocionalDecrescente()
        }
        for(let cont = 0; cont < resposta.length; cont ++){
            resposta[cont].admin = await BuscarIdAdm(resposta[cont].id_admin) 
            let infoCategoria = await BuscarIdCategoria(resposta[cont].id_categoria) 
            resposta[cont].categoria = infoCategoria.categoria 
            const detalhesProdutos = await BuscaDetalhesId(resposta[cont].id_detalhe)
            resposta[cont].detalhes = detalhesProdutos
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
        
        let produtosFiltrados = await filtrarProdutosPorDisponibilidadeAssinatura(valorBoolean)
        for(let cont = 0; cont < produtosFiltrados.length; cont ++){
            produtosFiltrados[cont].admin = await BuscarIdAdm(produtosFiltrados[cont].id_admin) 
            let infoCategoria = await BuscarIdCategoria(produtosFiltrados[cont].id_categoria) 
            produtosFiltrados[cont].categoria = infoCategoria.categoria 
            const detalhesProdutos = await BuscaDetalhesId(produtosFiltrados[cont].id_detalhe)
            produtosFiltrados[cont].detalhes = detalhesProdutos
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


        let resposta = await filtrarProdutosPorIdOuNome(valor)

        for(let cont = 0; cont < resposta.length; cont ++){
            resposta[cont].admin = await BuscarIdAdm(resposta[cont].id_admin) 
            let infoCategoria = await BuscarIdCategoria(resposta[cont].id_categoria) 
            resposta[cont].categoria = infoCategoria.categoria 
            const detalhesProdutos = await BuscaDetalhesId(resposta[cont].id_detalhe)
            resposta[cont].detalhes = detalhesProdutos
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

// produtoEndpoints.get('/filtro/produtos/ordenar/:coluna', async (req, resp) => {
//     try{
//         const {coluna} = req.params
//         console.log(coluna);
//         console.log(typeof coluna);
//         let coluna1 = ''
//         if(coluna === 'vl_preco'){
//             coluna1 = 'vl_preco'
//         }
//         const resposta = await ordenarProdutosPorColuna(coluna1)
        
//         resp.send(resposta)
//     }   
//     catch(err){
//         resp.status(500).send({
//             erro: err.message
//         })
//     }
// })

produtoEndpoints.get('/produto/:id', async (req, resp) => {
    try{
        const {id} = req.params

        if(!id || id === 0)
            throw new Error('Id produto não identificado')

        const resposta = await BuscaProdutoId(id)
        resposta.admin = await BuscarIdAdm(resposta.id_admin) 
        let infoCategoria = await BuscarIdCategoria(resposta.id_categoria) 
        resposta.categoria = infoCategoria.categoria
        resposta.imgCategoria = infoCategoria.img
        resposta.detalhes = await BuscaDetalhesId(resposta.id_detalhe)
        resposta.imagens = await BuscarImagens(resposta.id)


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

produtoEndpoints.get('/produtos/sugestoes', async (req, resp) => {
    try{
        let produtos = []
        for(let cont = 1; cont <= 8; cont++){
            let produtosCategoria = await filtrarProdutosPorCategorias(cont)
            if(produtosCategoria[0])
                produtos.push(produtosCategoria[0])
            if(produtosCategoria[1])
                produtos.push(produtosCategoria[1])
        }

        for(let cont = 0; cont < produtos.length; cont ++){
            produtos[cont].admin = await BuscarIdAdm(produtos[cont].id_admin) 
            let infoCategoria = await BuscarIdCategoria(produtos[cont].id_categoria) 
            produtos[cont].categoria = infoCategoria.categoria 
            const detalhesProdutos = await BuscaDetalhesId(produtos[cont].id_detalhe)
            produtos[cont].detalhes = detalhesProdutos
            const respImagens = await BuscarImagens(produtos[cont].id)
            produtos[cont].imagem = respImagens[0].caminho
        }
        
        resp.send(produtos)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})









// Alterando

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
        // console.log(infoDetalhes.descricao);
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














// Deletando

produtoEndpoints.delete('/:id/imagens', async (req, resp) => {
    try{
        const {deletar} = req.body
        // console.log(deletar);
        for(let item of deletar){
            // console.log(item);
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

produtoEndpoints.delete('/deletar/produto', async (req, resp) => {
    try{
        const {idDetalhe, idProduto} = req.body

        if(!idProduto || idProduto === 0 || isNaN(idProduto))
            throw new Error('Id do produto não identificado ou inválido')
        if(!idDetalhe || idDetalhe === 0 || isNaN(idDetalhe))
            throw new Error('id do detalhe não identificado ou inválido')

        const idsComboExcluir = await buscarIdsComboPorIdProduto(idProduto)
        if(idsComboExcluir.length !== 0){
            for(let cont = 0; cont < idsComboExcluir.length; cont++){
                let itensCombo = await deletarItensComboPorIdCombo(idsComboExcluir[cont].id_combo)
                if(itensCombo === 0)
                    throw new Error(`Não foi possível excluir os itens do combo com o id ${idsComboExcluir[cont].id_combo}`)
                
                let respCombo = await deletarComboPorIdCombo(idsComboExcluir[cont].id_combo)
                if(respCombo !== 1)
                    throw new Error(`Não foi possível excluir o combo com o id ${idsComboExcluir[cont].id_combo}`)
    
            }
        }

        const respostaImagens = await deletarImagensPorProduto(idProduto)
        const respostaProduto = await deletarProduto(idProduto)
        const respostaDetalhes = await deletarDetalhes(idDetalhe)

        if(respostaProduto !== 1)
            throw new Error('Não foi possivel excluir o produto')
        if(respostaDetalhes !== 1)
            throw new Error('Não foi possivel excluir os detalhes')
        if(respostaImagens === 0)
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