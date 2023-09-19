import conexao from './connection.js'

export async function teste() {
    const sql = `select * from tb_admin;`;

    const resposta = await conexao.query(sql);
    return resposta[0];
}


export async function cadastrarDetalhes (info) {
    const sql = `
                insert into tb_detalhes (ds_intensidade, ds_docura, ds_acidez, ds_torra, ds_produto, ds_marca, ds_peso, ds_alergia, ds_dimensoes)
                values  (?, ?, ?, ?, ?, ?, ?, ?, ?);`
    
    
    const resposta = await conexao.query(sql, [info.intensidade, info.docura, info.acidez, info.torra, info.descricao, info.marca, info.peso, info.alergia, info.dimensoes]);
    const dados = resposta[0];
    info.id = dados.insertId
    return info.id;
}

export async function cadastrarProduto (id, info) {
    const sql = `
                insert into tb_produto (id_detalhe, id_admin, id_categoria, nm_produto, vl_preco, vl_preco_promocional, bt_disponivel_assinatura, qtd_estoque)
                values(?, ?, ?, ?, ?, ?, ?, ?);`

    const resposta = await conexao.query(sql, id, [info.idAdmin, info.idCategoria, info.nome, info.preco, info.promocional, info.disponivelAssinatura, info.estoque]);
    const dados = resposta[0];
    return info.id;
}

export async function cadastrarImagens (info) {
    const sql = `
                insert into tb_produto_imagem (id_produto, ds_caminho)
                values(?, ?);`

    const resposta = conexao.query(sql, [info.idProduto, info.caminho]);
    const dados = resposta[0];
}


export async function deletar(id){
    const comando = `delete 
                       from tb_combo
	                  where id_combo = ?;`

    const [resp] =  await conexao.query(comando, [id])

    return resp.affectedRows
}