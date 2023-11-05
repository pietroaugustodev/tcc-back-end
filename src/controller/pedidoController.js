import { Router } from "express";
import { buscarClientePorNome, buscarPedidosPorClienteOuCodigo, buscarPedidosPorData, buscarPedidosPorFormaPagamento, buscarPedidosPorIdCliente, buscarPedidosPorStatus, buscarTodosPedidos, ordenarClientePorNome, ordenarPedidosPorData, ordenarPedidosPorFaturamento } from "../repository/pedidoRepository.js";




const pedidoEndpoints = Router()

// Buscando 

pedidoEndpoints.get('/pedidos', async (req, resp) => {
    try {
        const resposta = await buscarTodosPedidos()

        resp.send(resposta)
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

        const resposta = await buscarPedidosPorStatus(status)

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

        const resposta = await buscarPedidosPorFormaPagamento(forma)

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

        const resposta = await buscarPedidosPorData(data)

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
            resposta = await buscarPedidosPorClienteOuCodigo(pesquisa)
        }
        else{
            let clientesRetornados = await buscarClientePorNome(pesquisa)
            for(let cont = 0; cont < clientesRetornados.length; cont++){
                resposta[cont] = await buscarPedidosPorIdCliente(clientesRetornados[cont].id)
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

            for(let cont = 0; cont < clientesOrdenados.length; cont++){
                resposta[cont] = await buscarPedidosPorIdCliente(clientesOrdenados[cont].id)
            }
        }
        else if(campo === data){
            resposta = await ordenarPedidosPorData()
        }

        resp.send(resposta)
    }   
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})



export default pedidoEndpoints