import conexao from './connection.js'

export async function cadastro(cliente) {
    const comando = `insert into tb_cliente(nm_cliente, ds_telefone, ds_cpf, dt_nascimento, ds_email, ds_senha, dt_cadastro)
                                values(?, ?, ?, ?, ?, ?, now());`

    const [resp] = await conexao.query(comando, [cliente.nome, cliente.telefone, cliente.cpf, cliente.nascimento, cliente.email, cliente.senha])
    
    cliente.id = resp.insertId

    cliente.dtCadastro = await BuscarDataCadastro(cliente.id)

    return cliente
}

export async function BuscarDataCadastro(id) {
    const comando = `select dt_cadastro 
                       from tb_cliente 
                      where id_cliente = ?`
 
    const [resp] = await conexao.query(comando, [id])

    return resp[0].dt_cadastro
}

export async function cadastroEndereco(endereco){
    const comando = `insert into tb_endereco(id_cliente, ds_cep, ds_rua, ds_cidade, ds_complemento, nr_endereco)
                                    values  (?, ?, ?, ?, ?, ?)`


    const [resp] = await conexao.query(comando, [endereco.idCliente, endereco.cep, endereco.rua, endereco.cidade, endereco.complemento, endereco.numero])

    endereco.id = resp.insertId

    return endereco
}