import conexao from './connection.js'

export async function procurarAssinatura () {
    const sql = `select id_produto,
                        id_detalhe,
                        id_admin,
                        id_categoria,
                        nm_produto as produto,
                        vl_preco as preco,
                        vl_preco_promocional as promocional,
                        bt_disponivel_assinatura as assinatura,
                        qtd_estoque as estoque
                from tb_produto where bt_disponivel_assinatura = true;`;

    const [resp] = await conexao.query(sql);
    return resp;
}

export async function procurarImagemAssinatura () {
    
}

export async function novaAssinatura (info) {
    const sql = `
                insert into tb_assinatura (id_cliente, id_endereco, dt_inicio, dt_fim, vl_mensalidade)
                values(?, ?, curdate(), adddate(curdate(), interval 30 day), ?);
    `;

    const resp = await conexao.query(sql, [info.idCliente, info.idEndereco, info.mensalidade]);
    const dados = resp[0]
    info.id = dados.insertId;
    return info;
}