import conexao from './connection.js'

export async function criarCombo () {
    const sql = `insert into tb_combo`;
 
    const [resp] = await conexao.query(sql);
    console.log(resp);
    return resp;
} 

export async function adicionarItem() {
    const sql = ``;


}

// Buscando 


export async function buscarCombos() {
    const comando = `select id_combo 	as id,
                            nm_combo	as nome,
                            vl_preco	as preco
                       from tb_combo`

    const [resp] = await conexao.query(comando, [])
    
    return resp
}

export async function buscarItensComboPorIdCombo(id){
    const comando = `select id_combo_item  as id,
                            id_combo,
                            id_produto
                       from tb_combo_item
                      where id_combo = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp;
}
