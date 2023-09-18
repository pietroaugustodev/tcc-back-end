import conexao from './connection.js'


export async function Login(email, senha) {
    let comando = `select id_admin   as id, 
                          ds_email   as email,
                          nm_usuario as nome,
                          img_adm    as img
                     from tb_admin 
                    where ds_email = ?
                      and ds_senha = ?`

    let [resp] =  await conexao.query(comando, [email, senha])

    return resp[0]
}

export async function BuscarProdutos(){
  const comando = `select id_detalhe,
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

  const [resp] = await conexao.query(comando, [produto.nome, produto.id_admin, produto.id_categoria, produto.promocao, produto.preco, produto.estoque, produto.assinatura, id])

  return resp.affectedRows
}

export async function BuscaProdutoId(id) {
  let comando = `select id_detalhe,
                        id_admin,
                        id_categoria,
                        nm_produto                as produto,
                        vl_preco                  as preco,
                        vl_preco_promocional      as promocao,
                        bt_disponivel_assinatura  as assinatura,
                        qtd_estoque      			as estoque
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

  const [resp] = await conexao.query(comando, [detalhes.intensidade, detalhes.docura, detalhes.acidez, detalhes.torra, detalhes.produto, detalhes.marca, detalhes.peso, detalhes.alergia, detalhes.dimensoes, id])

  return resp.affectedRows
}