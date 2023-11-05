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

pedidoEndpoints.get('/pedidos/busca/:busca', async (req, resp) => {
    try{
        const {busca} = req.params

        let resposta = []
        if(busca[0] === '0' || busca[0] === '1' || busca[0] === '2' || busca[0] === '3' || busca[0] === '4' || busca[0] === '5' || busca[0] === '6' || busca[0] === '7' || busca[0] === '8' || busca[0] === '9'){
            resposta = await buscarPedidosPorClienteOuCodigo(busca)
        }
        else{
            let clientesRetornados = await buscarClientePorNome(busca)
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