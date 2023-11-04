import conexao from "./connection.js"




export async function buscarTodosPedidos(){
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            ds_codigo_pedido    as codigo,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido`

    const [resp] = await conexao.query(comando)
                             
    return resp
}

export async function buscarPedidosPorStatus(status){
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            ds_codigo_pedido    as codigo,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido
                      where ds_situacao = ?`
        
    const [resp] = await conexao.query(comando, [status])
    
    return resp
}

export async function buscarPedidosPorFormaPagamento(forma){
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            ds_codigo_pedido    as codigo,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido
                      where tp_forma_pagamento = ?`
            
    const [resp] = await conexao.query(comando, [forma])   
    
    return resp
}

export async function buscarPedidosPorData(data) {
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            ds_codigo_pedido    as codigo,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido
                      where dt_pedido like ?`
            
    const [resp] = await conexao.query(comando, [`%${data}%`])
    
    return resp
}