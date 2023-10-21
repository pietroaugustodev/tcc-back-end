import conexao from './connection.js'

// Cadastrando
export async function teste() {
    const sql = `select id_admin    as id
                        ds_email    as email,
                        nm_usuario  as usuario,
                        ds_senha    as senha,
                        img_adm     as img
                   from tb_admin;`;

    const resposta = await conexao.query(sql);
    return resposta[0];
}

export async function ultimoID () {
    const sql = `select last_insert_id();`;

    const resposta = await conexao.query(sql);
    const dados = resposta[0];

    return dados;
}

export async function cadastrarDetalhes (info) {
    const sql = `
                insert into tb_detalhes (ds_intensidade, ds_docura, ds_acidez, ds_torra, ds_produto, ds_marca, ds_peso, ds_alergia, ds_dimensoes)
                values  (?, ?, ?, ?, ?, ?, ?, ?, ?);`
    
    
    const resposta = await conexao.query(sql, [info.intensidade, info.docura, info.acidez, info.torra, info.descricao, info.marca, info.peso, info.alergia, info.dimensoes]);
    const dados = resposta[0];
    info.id = dados.insertId;
    return info.id;
}

export async function cadastrarProduto (info) {
    const sql = `
                insert into tb_produto (id_detalhe, id_admin, id_categoria, nm_produto, vl_preco, vl_preco_promocional, bt_disponivel_assinatura, qtd_estoque)
                values(?, ?, ?, ?, ?, ?, ?, ?);
                `

    const resposta = await conexao.query(sql, [info.idDetalhe, info.idAdm, info.idCategoria, info.nome, info.preco, info.promocional, info.disponivelAssinatura, info.estoque]);
    const dados = resposta[0];
    info.idProduto = dados.insertId;
    return info;
};

export async function cadastrarImagens (info) {
    const sql = `
                insert into tb_produto_imagem (id_produto, ds_caminho)
                values(?, ?);`

    const resposta = conexao.query(sql, [info.idProduto, info.caminho]);
    const dados = resposta[0];
}

// Buscas

export async function BuscarProdutos(){
  const comando = `select id_produto                as id,
                          id_detalhe,
                          id_admin,
                          id_categoria,
                          nm_produto                as produto,
                          vl_preco                  as preco,
                          vl_preco_promocional      as promocao,
                          bt_disponivel_assinatura  as assinatura,
                          qtd_estoque               as estoque
                     from tb_produto`

  const [resp] = await conexao.query(comando)

  return resp;
}

export async function BuscarIdCategoria(id){
  const comando = `select nm_categoria  as categoria
                     from tb_categoria
                    where id_categoria = ?`

  const [resp] = await conexao.query(comando, [id])

  return resp[0].categoria
}

export async function BuscarIdAdm(id){
  const comando = `select nm_usuario  as usuario
                     from tb_admin
                    where id_admin = ?`

  const [resp] = await conexao.query(comando, [id])

  return resp[0].usuario
}

export async function buscarTodosAdms(){
  const comando = `select 	id_admin	as id,
                            nm_usuario	as usuario,
                            img_adm		as img,
                            ds_email	as email
                     from   tb_admin`

  const [resp]= await conexao.query(comando, [])

  return resp
}

export async function buscarCategorias(){
  const comando = `select 	id_categoria		as id,
                            nm_categoria		as nome,
                            img_categoria		as img
                     from   tb_categoria`

  const [resp] = await conexao.query(comando, [])

  return resp
}

export async function filtrarProdutosPorAdm(idAdm){
  const comando = `select id_produto                as id,
                          id_detalhe,
                          id_admin,
                          id_categoria,
                          nm_produto                as produto,
                          vl_preco                  as preco,
                          vl_preco_promocional      as promocao,
                          bt_disponivel_assinatura  as assinatura,
                          qtd_estoque               as estoque
                          from tb_produto
                    where id_admin = ?`
  
  const [resp] = await conexao.query(comando, [idAdm])

  return resp
}

export async function ordenarProdutosPorEstoque() {
  const comando = `select id_produto    as id,
                          id_detalhe,
                          id_admin,
                          id_categoria,
                          nm_produto                as produto,
                          vl_preco                  as preco,
                          vl_preco_promocional      as promocao,
                          bt_disponivel_assinatura  as assinatura,
                          qtd_estoque               as estoque
                          from  tb_produto
                   order by qtd_estoque desc`
  
  const [resp] = await conexao.query(comando)

  return resp
}

export async function filtrarProdutosPorCategorias(idCategoria){
  const comando = `select id_produto                as id,
                          id_detalhe,
                          id_admin,
                          id_categoria,
                          nm_produto                as produto,
                          vl_preco                  as preco,
                          vl_preco_promocional      as promocao,
                          bt_disponivel_assinatura  as assinatura,
                          qtd_estoque               as estoque
                          from tb_produto
                    where id_categoria = ?`

  const [resp]= await conexao.query(comando, [idCategoria])
  
  return resp
}

// Alteração 

export async function BuscaProdutoId(id) {
  let comando = `select id_produto                as id,
                        id_detalhe,
                        id_admin,
                        id_categoria,
                        nm_produto                as produto,
                        vl_preco                  as preco,
                        vl_preco_promocional      as promocao,
                        bt_disponivel_assinatura  as assinatura,
                        qtd_estoque      			    as estoque
                   from tb_produto
                  where id_produto = ?`
  const [resp] = await conexao.query(comando, id)

  return resp[0]
}

export async function BuscaDetalhesId(id) {
  let comando = `select id_detalhe,
                        ds_intensidade 	as intensidade,
                        ds_docura 		  as docura,
                        ds_acidez 		  as acidez,
                        ds_torra 		    as torra,
                        ds_produto 		  as produto,
                        ds_marca 		    as marca,
                        ds_peso 		    as peso,
                        ds_alergia 		  as alergia,
                        ds_dimensoes 	  as dimensoes
                   from tb_detalhes
                  where id_detalhe = ?`
  const [resp] = await conexao.query(comando, id)

  return resp[0]
}

export async function BuscarImagens(id){
    const comando = `select id_produto_img  as id,
                            id_produto,
                            ds_caminho      as caminho
                       from tb_produto_imagem
                      where id_produto = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp
}

export async function deletarImagem(id){
  const comando = `delete 
                     from tb_produto_imagem
                    where id_produto_img = ?`

  const [resp] = await conexao.query(comando, [id])

  return resp.affectedRows
}
  
  export async function AlterarProduto(produto, id){
    const comando = `update tb_produto
                        set nm_produto = ?,
                            id_admin = ?,
                            id_categoria = ?,
                            vl_preco_promocional = ?,
                            vl_preco = ?,
                            qtd_estoque = ?,
                            bt_disponivel_assinatura = ?
                      where id_produto = ?`
  
    const [resp] = await conexao.query(comando, [produto.nome, produto.idAdm, produto.idCategoria, produto.promocional, produto.preco, produto.estoque, produto.disponivelAssinatura, id])
  
    return resp.affectedRows
  }
  export async function AlterarDetalhesProduto(detalhes, id){
    const comando = `update tb_detalhes
                        set ds_intensidade = ?,
                            ds_docura = ?,
                            ds_acidez = ?,
                            ds_torra = ?,
                            ds_produto = ?,
                            ds_marca = ?,
                            ds_peso = ?,
                            ds_alergia = ?,
                            ds_dimensoes = ?
                      where id_detalhe = ?`
  
    const [resp] = await conexao.query(comando, [detalhes.intensidade, detalhes.docura, detalhes.acidez, detalhes.torra, detalhes.descricao, detalhes.marca, detalhes.peso, detalhes.alergia, detalhes.dimensoes, id])
  
    return resp.affectedRows
  }
  
  export async function AlterarImagens(idProduto, caminho){
    const comando = `update tb_produto_imagem
                        set ds_caminho = ?,
                            id_produto = ?
                      where id_produto = ?`

    const [resp] = await conexao.query(comando, [caminho, idProduto])

    return resp.affectedRows
}
  // Deletando

  export async function deletarProduto(id){
    const comando = `delete 
                       from tb_produto
	                    where id_produto = ?`

    const [resp] =  await conexao.query(comando, [id])
 
    return resp.affectedRows
}

export async function deletarDetalhes(id){
  const comando = `delete 
                     from tb_detalhes
                    where id_detalhe = ?`

  const [resp] =  await conexao.query(comando, [id])

  return resp.affectedRows
}

export async function deletarImagensPorProduto(id){
  const comando = `delete 
                     from tb_produto_imagem
                    where id_produto = ?`

  const [resp] =  await conexao.query(comando, [id])

  return resp.affectedRows
}