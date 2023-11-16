import conexao from "./connection.js"






export async function buscarPedidosEntreDatas(dtInicio, dtFim, situacao){
    const comando = `select count(id_pedido)    as qtd
                       from tb_pedido
                      where dt_pedido between ? and ?
                        and ds_situacao = ? `

    const [resp] = await conexao.query(comando, [dtInicio, dtFim, situacao])

    return resp[0]
}

export async function buscarClientesEntreDatas(dtInicio, dtFim){
    const comando = `select count(id_cliente)   as qtd
                       from tb_cliente
                      where dt_cadastro between ? and ? `

    const [resp] = await conexao.query(comando, [dtInicio, dtFim])    
    
    return resp[0]
}

export async function buscarAssinaturasEntreDatas(dtInicip, dtFim){
    const comando = `select count(id_assinatura)    as qtd
                       from tb_assinatura
                      where dt_inicio between ? and ?`

    const [resp] = await conexao.query(comando, [dtInicip, dtFim])
    
    return resp[0]
}