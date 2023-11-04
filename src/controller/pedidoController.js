import { Router } from "express";
import { buscarPedidosPorData, buscarPedidosPorFormaPagamento, buscarPedidosPorStatus, buscarTodosPedidos } from "../repository/pedidoRepository.js";




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
        const datas = Date(data)
        // console.log(datas);

        const resposta = await buscarPedidosPorData(data)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

export default pedidoEndpoints