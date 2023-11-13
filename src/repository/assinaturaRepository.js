import conexao from './connection.js'

// BUSCANDO

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

export async function procurarAssinaturaId (id) {
    const sql = `
                SELECT 
                    prod.id_produto,
                    ai.id_assinatura,
                    ai.qtd_itens,
                    ass.dt_fim,
                    ass.vl_mensalidade,
                    prod.nm_produto,
                    prod.vl_preco
                FROM
                    tb_assinatura_item AS ai
                        INNER JOIN
                    tb_assinatura AS ass ON ass.id_assinatura = ai.id_assinatura
                        INNER JOIN
                    tb_produto AS prod ON prod.id_produto = ai.id_produto
                WHERE
                    ass.id_assinatura = ?;
 
    `;
    const [resp] = await conexao.query(sql, id);
    return resp;
}

export async function verificarAssinatura (id) {
    const sql = `
                select * from tb_assinatura where id_cliente = ?;
    `;

    const [resp] = await conexao.query(sql, id);
    return resp;
}

// INSERINDO
 
export async function novaAssinatura (info) {
    const sql = `
                insert into tb_assinatura (id_cliente, id_endereco, dt_inicio, dt_fim, vl_mensalidade)
                                    values(?, ?, curdate(), adddate(curdate(), interval 30 day), ?);
    `;

    const resp = await conexao.query(sql, [info.idCliente, info.idEndereco, info.mensalidade]);
    const dados = resp[0];
    info.id = dados.insertId;
    return info;
};

export async function inserirProdutosAssinatura (info) {
    const sql = `
                insert into tb_assinatura_item (id_produto, id_assinatura, qtd_itens)
                                        values (?, ?, ?)
    `;

    const resp = await conexao.query(sql, [info.idProduto, info.idAssinatura, info.qtd]);
    const dados = resp[0];
    info.id = dados.insertId;
    return info;
}


// DELETANDO 

export async function cancelarAssinaturaItens (id) {
    const sql = `
                DELETE FROM
                tb_assinatura_item WHERE
                id_assinatura = ?;
    `;

    const [resp] = await conexao.query(sql, id);
    return resp;
}

export async function cancelarAssinatura(id) {
    const sql = `
            DELETE FROM
            tb_assinatura
            WHERE id_assinatura = ?;
    `;

    const [resp] = await conexao.query(sql, id);
    return resp;
}