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
                ass.dt_inicio,
                ass.ds_situacao,
                ass.dt_fim,
                ass.vl_mensalidade,
                prod.nm_produto,
                prod.vl_preco,
                ass.id_cliente,
                cli.ds_cpf,
                cli.ds_telefone,
                cli.ds_email,
                ende.ds_rua
            FROM
                tb_assinatura_item AS ai
            INNER JOIN
                tb_assinatura AS ass ON ass.id_assinatura = ai.id_assinatura
            INNER JOIN
                tb_produto AS prod ON prod.id_produto = ai.id_produto
            INNER JOIN
                tb_cliente as cli ON ass.id_cliente = cli.id_cliente
            INNER JOIN
                tb_endereco as ende on ass.id_endereco = ende.id_endereco
            WHERE ass.id_cliente = ?;
            
    `;
    const [resp] = await conexao.query(sql, id);
    return resp;
}

export async function procurarAssinaturaIdCompleto (id) {
    const sql = `
            SELECT 
                prod.id_produto,
                ai.id_assinatura,
                ai.qtd_itens,
                ass.dt_inicio,
                ass.ds_situacao,
                ass.dt_fim,
                ass.vl_mensalidade,
                prod.nm_produto,
                prod.vl_preco,
                ass.id_cliente,
                cli.ds_cpf,
                cli.ds_telefone,
                cli.ds_email,
                ende.ds_rua,
                cli.nm_cliente
            FROM
                tb_assinatura_item AS ai
            INNER JOIN
                tb_assinatura AS ass ON ass.id_assinatura = ai.id_assinatura
            INNER JOIN
                tb_produto AS prod ON prod.id_produto = ai.id_produto
            INNER JOIN
                tb_cliente as cli ON ass.id_cliente = cli.id_cliente
            INNER JOIN
                tb_endereco as ende on ass.id_endereco = ende.id_endereco
            WHERE ass.id_assinatura = ?;
    `;

    const [resp] = await conexao.query(sql, id);
    return resp;
}


export async function buscarAssinaturas() {
    const comando = `select id_assinatura   as id,
                            id_cliente,
                            id_endereco,
                            dt_inicio,
                            dt_fim,
                            vl_mensalidade  as mensalidade,
                            ds_situacao     as situacao
                       from tb_assinatura`

    const [resp] = await conexao.query(comando)

    return resp
}

export async function buscarAssinaturasPorClienteOuId(valor) {
    const comando = `   select id_assinatura   as id,
                               id_cliente,
                               id_endereco,
                               dt_inicio,
                               dt_fim,
                               vl_mensalidade  as mensalidade,
                               ds_situacao     as situacao
                          from tb_assinatura
                    inner join tb_cliente
                            on tb_cliente.id_cliente = tb_assinatura.id_cliente
                         where nm_cliente like ?
                            or id_assinatura = ?`
                        
    const [resp] = await conexao.query(comando, [`%${valor}%`, valor])
    
    return resp
}

export async function ordenarAssinaturasPorPrecoMaiorAoMenor() {
    const comando = `select id_assinatura   as id,
                            id_cliente,
                            id_endereco,
                            dt_inicio,
                            dt_fim,
                            vl_mensalidade  as mensalidade,
                            ds_situacao     as situacao
                        from tb_assinatura
                     order by vl_mensalidade desc`

    const [resp] = await conexao.query(comando, [])

    return resp
}

export async function ordenarAssinaturasPorPrecoMenorAoMaior() {
    const comando = `select id_assinatura   as id,
                            id_cliente,
                            id_endereco,
                            dt_inicio,
                            dt_fim,
                            vl_mensalidade  as mensalidade,
                            ds_situacao     as situacao
                        from tb_assinatura
                        order by vl_mensalidade asc`

    const [resp] = await conexao.query(comando, [])

    return resp
}

export async function buscarAssinaturasPorStatus(status){
    const comando = `select id_assinatura   as id,
                            id_cliente,
                            id_endereco,
                            dt_inicio,
                            dt_fim,
                            vl_mensalidade  as mensalidade,
                            ds_situacao     as situacao
                       from tb_assinatura
                      where ds_situacao = ?`

    const [resp] = await conexao.query(comando, [status])

    return resp
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
                insert into tb_assinatura (id_cliente, id_endereco, dt_inicio, dt_fim, vl_mensalidade, ds_situacao)
                                    values(?, ?, curdate(), adddate(curdate(), interval 30 day), ?, 'Pago');
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


// Alterando 

export async function alterandoStatusAssinatura(id, status) {
    const comando = `update
                        from tb_assinatura
                        set ds_situacao = ?
                        where id_assinatura = ?`

    const [resp] = await conexao.query(comando, [status, id])
    
    return resp.affectedRows
}