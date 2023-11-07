import conexao from "./connection.js"


// Buscando
 
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
    
    return resp;
}

export async function buscarPedidosPorCodigo(busca){
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
                      where ds_codigo_pedido = ?`

    const [resp] = await conexao.query(comando, [busca])

    return resp
}

export async function buscarClientePorNome(nome){
    const comando = `select id_cliente      as id,
                            nm_cliente      as nome,
                            ds_telefone     as telefone,
                            ds_cpf          as cpf,
                            dt_nascimento   as nascimento,
                            ds_email        as email,
                            dt_cadastro
                       from tb_cliente
                      where nm_cliente like ?`

    const [resp] = await conexao.query(comando, [`%${nome}%`])

    return resp
}

export async function buscarClientePorId(id){
    const comando = `select id_cliente      as id,
                            nm_cliente      as nome,
                            ds_telefone     as telefone,
                            ds_cpf          as cpf,
                            dt_nascimento   as nascimento,
                            ds_email        as email,
                            dt_cadastro
                       from tb_cliente
                      where id_cliente = ?`
    
    const [resp] = await conexao.query(comando, [id])          
    
    return resp[0]
}

export async function ordenarPedidosPorFaturamento(){
    const comando = ` select    id_pedido           as id,
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
                        from    tb_pedido
                    order by    vl_total desc`

    const [resp] = await conexao.query(comando)

    return resp
}

export async function buscarPedidosPorIdCliente(id){
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
                      where id_cliente = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp
}

export async function ordenarClientePorNome(){
    const comando = ` select id_cliente      as id,
                             nm_cliente      as nome,
                             ds_telefone     as telefone,
                             ds_cpf          as cpf,
                             dt_nascimento   as nascimento,
                             ds_email        as email,
                             dt_cadastro
                        from tb_cliente
                    order by nm_cliente`

    const [resp] = await conexao.query(comando)

    return resp
}

export async function ordenarPedidosPorData(){
    const comando = `select  id_pedido           as id,
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
                    order by dt_pedido desc`
    
    const [resp] = await conexao.query(comando)
    
    return resp
}

export async function buscarPedidoPorIdPedido(id){
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
                      where id_pedido = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp[0]
}

export async function buscarItemsPedidoPorIdPedido(id){

    const comando = `select id_pedido_item  as id,
                            id_pedido,
                            id_produto,
                            qtd_itens       as qtd
                       from tb_pedido_item     
                      where id_pedido = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp
}















/// Alterando

export async function alterarStatus(novoStatus, id){
    const comando = `update tb_pedido
                        set ds_situacao = ?
                      where id_pedido = ?`
                    
    const [resp] = await conexao.query(comando, [novoStatus, id])     
    
    return resp.affectedRows
}