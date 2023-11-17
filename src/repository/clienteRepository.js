import conexao from './connection.js'

// Inserindo

export async function cadastro(cliente) {
    const comando = `insert into tb_cliente(nm_cliente, ds_telefone, ds_cpf, dt_nascimento, ds_email, ds_senha, dt_cadastro)
    values(?, ?, ?, ?, ?, ?, now());`
    
    const [resp] = await conexao.query(comando, [cliente.nome, cliente.telefone, cliente.cpf, cliente.nascimento, cliente.email, cliente.senha])
    
    const clienteNovo = {
        email: cliente.email,
        telefone: cliente.telefone,
        cpf: cliente.cpf,
        nome: cliente.nome,
        nascimento: '',
        id: resp.insertId,
    }
    clienteNovo.dtCadastro = await BuscarDataCadastro(resp.insertId)
    
    return clienteNovo
}

export async function cadastroEndereco(endereco){
    const comando = `insert into tb_endereco(id_cliente, ds_cep, ds_rua, ds_cidade, ds_complemento, nr_endereco)
                                    values  (?, ?, ?, ?, ?, ?)`


    const [resp] = await conexao.query(comando, [endereco.idCliente, endereco.cep, endereco.rua, endereco.cidade, endereco.complemento, endereco.numero])

    endereco.id = resp.insertId

    return endereco
}

export async function cadastroEnderecoAssinatura(endereco){
    const comando = `insert into tb_endereco(id_cliente, ds_cep, ds_rua, ds_cidade, ds_complemento, nr_endereco)
                                    values  (?, ?, ?, ?, ?, ?)`


    const [resp] = await conexao.query(comando, [endereco.idCliente, endereco.cep, endereco.rua, endereco.cidade, endereco.complemento, endereco.numero])

    endereco.id = resp.insertId

    return endereco
}

export async function cadastroCartao(info) {
    const comando = ` insert into tb_cartoes (id_cliente, ds_identidade_titular, ds_nome_titular, ds_cvv, ds_validade, nr_cartao)
                      values (?, ?, ?, ?, ?, ?);
    `;

    const [resp] = await conexao.query(comando, [info.idCliente, info.identidade, info.titular, info.cvv, info.validade, info.numeroCartao])
    info.id = resp.insertId;

    return info;
}

// Buscando

export async function BuscarDataCadastro(id) {
    const comando = `select dt_cadastro 
                       from tb_cliente 
                      where id_cliente = ?`
 
    const [resp] = await conexao.query(comando, [id])

    return resp[0].dt_cadastro
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

export async function buscarCartoesPorIdCliente (idCliente) {
    const comando = `select id_cartoes              as id,
                            id_cliente,
                            ds_identidade_titular	as identidade,
                            ds_nome_titular         as nome,
                            ds_cvv			        as cvv,
                            ds_validade 	        as complemento,
                            nr_cartao		        as numero
                       from tb_cartoes
                      where	id_cliente = ?`;

                const [resp] = await conexao.query(comando, [idCliente])

    return resp; 
}

export async function buscarCartaoPorIdCartao(id) {
    const comando = `select id_cartoes              as id,
                            id_cliente,
                            ds_identidade_titular	as identidade,
                            ds_nome_titular         as nome,
                            ds_cvv			        as cvv,
                            ds_validade 	        as complemento,
                            nr_cartao		        as numero
                       from tb_cartoes
                      where id_cartoes = ? `

    const [resp] = await conexao.query(comando, [id])
    
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

export async function buscarEnderecoPorIdEndereco(id){
    const comando = `select id_endereco     as id,
                            id_cliente,
                            ds_cep			as cep,
                            ds_rua			as rua,
                            ds_cidade		as cidade,
                            ds_complemento	as complemento,
                            nr_endereco		as numero
                       from tb_endereco
                      where id_endereco = ?`

    const [resp] = await conexao.query(comando, [id])
    
    return resp[0]
}


export async function buscarEnderecosPorIdCliente(idCliente){
    const comando = `select id_endereco     as id,
                            id_cliente,
                            ds_cep			as cep,
                            ds_rua			as rua,
                            ds_cidade		as cidade,
                            ds_complemento	as complemento,
                            nr_endereco		as numero
                       from tb_endereco
                      where	id_cliente = ?`

    const [resp] = await conexao.query(comando, [idCliente])

    return resp;
}

export async function buscarClienteId (idCliente) {
    const sql = `
                SELECT id_cliente,
                        nm_cliente as nome,
                        ds_telefone as telefone,
                        ds_cpf as cpf,
                        dt_nascimento as nascimento,
                        ds_email as email,
                        dt_cadastro as cadastro
                FROM tb_cliente
                WHERE id_cliente = ?
    `;

    const [resp] = await conexao.query(sql, [idCliente]);
    return resp[0]
}



// Alterando 

export async function alterarEndereco(id, endereco){
    const comando = `update tb_endereco
                        set ds_cep         = ?,
                            ds_rua         = ?,
                            ds_cidade	   = ? ,
                            ds_complemento = ?,
                            nr_endereco    = ?
                      where id_endereco      = ?`
    
    const [resp] = await conexao.query(comando, [endereco.cep, endereco.rua, endereco.cidade, endereco.complemento, endereco.numero, id])

    return resp.affectedRows
}

export async function alterarCliente(id, dados){
    const comando = `update tb_cliente
                        set nm_cliente      = ?,
                            ds_telefone     = ?,
                            ds_cpf 		    = ?,
                            dt_nascimento   = ?,
                            ds_email        = ?
                      where id_cliente      = ?`

    const [resp] = await conexao.query(comando, [dados.nome, dados.telefone, dados.cpf, dados.nascimento, dados.email, id])

    return resp.affectedRows
}


// Deletando

export async function deletarEndereco(id){
    const comando = `delete 
                       from tb_endereco 
                      where id_endereco = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp.affectedRows;
}