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