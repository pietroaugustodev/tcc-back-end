import { Router } from "express";
import { alterarStatus, buscarClientePorId, buscarClientePorNome, buscarItemsPedidoPorIdPedido, buscarPedidoPorIdPedido, buscarPedidosPorCodigo, buscarPedidosPorData, buscarPedidosPorFormaPagamento, buscarPedidosPorIdCliente, buscarPedidosPorStatus, buscarTodosPedidos, ordenarClientePorNome, ordenarPedidosPorData, ordenarPedidosPorFaturamento } from "../repository/pedidoRepository.js";
import { BuscaDetalhesId, BuscaProdutoId, BuscarIdCategoria, BuscarImagens } from "../repository/produtoRepository.js";

const pedidoEndpoints = Router()










// Buscando 

pedidoEndpoints.get('/pedidos', async (req, resp) => {
    try {
        let resposta = await buscarTodosPedidos()

        for(let cont = 0; cont < resposta.length; cont++){
            const cliente = await buscarClientePorId(resposta[cont].id_cliente)
            resposta[cont].cliente = cliente.nome
        }

        let pedidosFiltrados = resposta.filter(item => item.situacao !== 'Cancelado' && item.situacao !== 'Entregue')

        resp.send(pedidosFiltrados)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

pedidoEndpoints.get('/pedidos/status/:status', async (req, resp) => {
    try{
        const { status } = req.params

        let resposta = await buscarPedidosPorStatus(status)
        for(let cont = 0; cont < resposta.length; cont++){
            const cliente = await buscarClientePorId(resposta[cont].id_cliente)
            resposta[cont].cliente = cliente.nome
        }

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

pedidoEndpoints.get('/pedidos/forma-pagamento/:forma', async (req, resp) => {
    try {
        const {forma} = req.params

        let resposta = await buscarPedidosPorFormaPagamento(forma)
        for(let cont = 0; cont < resposta.length; cont++){
            const cliente = await buscarClientePorId(resposta[cont].id_cliente)
            resposta[cont].cliente = cliente.nome
        }

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

pedidoEndpoints.get('/pedidos/data/:data', async (req, resp) => {
    try{
        const {data} = req.params

        let resposta = await buscarPedidosPorData(data)
        for(let cont = 0; cont < resposta.length; cont++){
            const cliente = await buscarClientePorId(resposta[cont].id_cliente)
            resposta[cont].cliente = cliente.nome
        }

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        }) 
    }
})

pedidoEndpoints.get('/pedidos/pesquisa/:pesquisa', async (req, resp) => {
    try{
        const {pesquisa} = req.params
        
        let resposta = []
        if(pesquisa[0] === '0' || pesquisa[0] === '1' || pesquisa[0] === '2' || pesquisa[0] === '3' || pesquisa[0] === '4' || pesquisa[0] === '5' || pesquisa[0] === '6' || pesquisa[0] === '7' || pesquisa[0] === '8' || pesquisa[0] === '9'){
            resposta = await buscarPedidosPorCodigo(pesquisa)
            for(let cont = 0; cont < resposta.length; cont++){
                const cliente = await buscarClientePorId(resposta[cont].id_cliente)
                resposta[cont].cliente = cliente.nome
            }
        }
        else{
            let clientesRetornados = await buscarClientePorNome(pesquisa)
            let contador = 0
            
            for(let conta = 0; conta < clientesRetornados.length; conta++){
                let pedidosCliente = await buscarPedidosPorIdCliente(clientesRetornados[conta].id)

                for(let cont = 0; cont < pedidosCliente.length; cont++){
                    resposta[contador] = pedidosCliente[cont]
                    resposta[contador].cliente = clientesRetornados[conta].nome
                    contador++
                }
            }
        }

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

pedidoEndpoints.get('/pedidos/ordenar/:campo', async (req, resp) => {
    try{
        const {campo} = req.params
        
        let resposta = []
        if(campo === 'faturamento'){ 
            resposta = await ordenarPedidosPorFaturamento()
        }
        else if(campo === 'cliente'){
            const clientesOrdenados = await ordenarClientePorNome()
            let contador = 0;

            for(let cont = 0; cont < clientesOrdenados.length; cont++){
                let pedidosCliente = await buscarPedidosPorIdCliente(clientesOrdenados[cont].id)

                for(let conta = 0; conta < pedidosCliente.length; conta++){
                    resposta[contador] = pedidosCliente[conta]
                    contador++
                }

            }
        }
        else if(campo === 'data'){
            resposta = await ordenarPedidosPorData()
        }

        for(let cont = 0; cont < resposta.length; cont++){
            const cliente = await buscarClientePorId(resposta[cont].id_cliente)
            resposta[cont].cliente = cliente.nome
        }

        resp.send(resposta)
    }   
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

pedidoEndpoints.get('/pedido/:id', async (req, resp) => {
    try{
        const {id} = req.params

        let pedido = await buscarPedidoPorIdPedido(id)
        pedido.cliente = await buscarClientePorId(pedido.id_cliente)
        console.log(pedido);
        pedido.itens = await buscarItemsPedidoPorIdPedido(id)

        for(let cont = 0; cont < pedido.itens.length; cont ++){
            pedido.itens[cont].produto = await BuscaProdutoId(pedido.itens[cont].id_produto)
            pedido.itens[cont].produto.categoria = await BuscarIdCategoria(pedido.itens[cont].produto.id_categoria)
            const respImagens = await BuscarImagens(pedido.itens[cont].produto.id)
            pedido.itens[cont].produto.imagem = respImagens[0].caminho
            const detalhesProdutos = await BuscaDetalhesId(pedido.itens[cont].produto.id)
            pedido.itens[cont].produto.detalhes = detalhesProdutos
        }

        resp.send(pedido)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})















// Alterando 

pedidoEndpoints.put('/pedido/status', async (req, resp) => {
    try{
        const {status, id} = req.query

        const resposta = await alterarStatus(status, id)
        if(resposta !== 1)
            throw new Error('Não foi possível alterar os status do pedido com id ' + id)

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})



export default pedidoEndpoints