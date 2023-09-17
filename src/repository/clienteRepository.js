import conexao from './connection.js'

export async function cadastro(cliente) {
    const comando = `insert into tb_cliente(nm_cliente, ds_telefone, ds_cpf, dt_nascimento, ds_email, ds_senha, dt_cadastro)
                                values(?, ?, ?, ?, ?, ?, now());`

    const [resp] = await conexao.query(comando, [cliente.nome, cliente.telefone, cliente.cpf, cliente.nascimento, cliente.email, cliente.senha])
    
    const clienteNovo = {
        email: cliente.email,
        telefone: cliente.telefone,
        cpf: cliente.cpf,
        nome: cliente.nome,
        nascimento: cliente.nascimento,
        id: resp.insertId,
    }
    clienteNovo.dtCadastro = await BuscarDataCadastro(resp.insertId)
    
    return clienteNovo
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


export async function BuscarRepetido(busca){
    const comando = `select ds_email    as email,
                            ds_telefone as telefone,
                            ds_cpf      as cpf 
                       from tb_cliente
	                  where ds_email = ?
				         or ds_telefone = ?
                         or ds_cpf = ?`

    const [resp] = await conexao.query(comando, [busca, busca, busca])

    return resp[0]
}

export async function Login(email, senha){
    const comando = `select ds_email        as email,
                            dt_nascimento   as nascimento,
                            ds_telefone     as telefone,
                            nm_cliente      as nome,
                            id_cliente      as id,
                            ds_cpf          as cpf,
                            dt_cadastro     as cadastro
                       from tb_cliente
                      where ds_email = ?
                        and ds_senha = ?`

    const [resp] = await conexao.query(comando, [email, senha])

    return resp[0]
}