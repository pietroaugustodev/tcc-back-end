import { buscarAssinaturasEntreDatas, buscarClientesEntreDatas, buscarPedidosEntreDatas } from "../repository/estatisticasRepository.js"
import { Router } from 'express'



const estatiticasEndpoints = Router()


estatiticasEndpoints.get('/estatisticas', async (req, resp) => {
    try{
        let { dtInicio, dtFim, campo} = req.query
        dtInicio = dtInicio + ' 00:00:00'
        dtFim = dtFim + ' 23:59:59'
        
        let resposta = ''

        if(campo == 'pedidosConcluidos')
            resposta = await buscarPedidosEntreDatas(dtInicio, dtFim, 'Entregue')
        
        else if(campo == 'pedidosCancelados')
            resposta = await buscarPedidosEntreDatas(dtInicio, dtFim, 'Cancelado')

        else if(campo == 'assinaturas')
            resposta = await buscarAssinaturasEntreDatas(dtInicio, dtFim)
        
        else if(campo == 'clientes')
            resposta = await buscarClientesEntreDatas(dtInicio, dtFim)

        resp.send(resposta)
    }   
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


export default estatiticasEndpoints

