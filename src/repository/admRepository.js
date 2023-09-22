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
