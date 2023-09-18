import conexao from "./connection.js";

export async function encontrarDetalheID (id) {
    const sql = `
            select * from tb_detalhes
            where id_detalhe = ?;
        `;

    const resposta = await conexao.query(sql, [id]);
    const dados = resposta[0];

    return dados;
}