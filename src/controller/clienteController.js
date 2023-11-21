import { Router } from "express";
import { buscarCartoesPorIdCliente, BuscarRepetido, Login, alterarEndereco, buscarEnderecosPorIdCliente, cadastro, cadastroEndereco, cadastroEnderecoAssinatura, deletarEndereco, cadastroCartao, alterarCliente, buscarClienteId, buscarEnderecoPorIdEndereco } from "../repository/clienteRepository.js";


const clienteEndpoints = Router()


// Inserindo 

clienteEndpoints.post('/cliente', async (req, resp) =>{
    try{
        const cliente = req.body
        if(!cliente.nome || cliente.nome.length > 50)
            throw new Error('O nome indefinido ou muito extenso.')
        if(!cliente.telefone)
            throw new Error('Telefone obrigatório')
        if(!cliente.cpf)
            throw new Error('CPF obrigatório')
        if(!cliente.email)
            throw new Error('E-mail obrigatório')
        if(!cliente.senha)
            throw new Error('Senha obrigatória')

        const emailRepetido = await BuscarRepetido(cliente.email)
        const telefoneRepetido = await BuscarRepetido(cliente.telefone)
        const cpfRepetido = await BuscarRepetido(cliente.cpf)
        if(emailRepetido || telefoneRepetido || cpfRepetido)
            throw new Error('Você já possui cadastro')

        const resposta = await cadastro(cliente)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

clienteEndpoints.post('/endereco/:num', async (req, resp) => {
    try{
        const endereco = req.body
        endereco.idCliente = Number(req.params.num)
        if(!endereco.idCliente || endereco.idCliente === 0)
            throw new Error('Id endereço inválido ou não encontrado')
        if(!endereco.cep)
            throw new Error('CEP obrigatório')
        if(!endereco.cidade)
            throw new Error('CEP incorreto')
        if(!endereco.rua)
            throw new Error('CEP incorreto')
        if(!endereco.numero)
            throw new Error('Número da casa obrigatório')

        const resposta = await cadastroEndereco(endereco)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

clienteEndpoints.post('/assinatura/endereco/:num', async (req, resp) => {
    try{
        const endereco = req.body
        endereco.idCliente = Number(req.params.num)
        if(!endereco.idCliente || endereco.idCliente === 0)
            throw new Error('Id endereço inválido ou não encontrado')
        if(!endereco.cep)
            throw new Error('CEP obrigatório')
        if(!endereco.numero)
            throw new Error('Número da casa obrigatório')

        const resposta = await cadastroEnderecoAssinatura(endereco)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

clienteEndpoints.post('/cartao/:num', async (req, resp) => {
    try {
        const infoCartao = req.body;
        infoCartao.id = Number(req.params.num);
        // console.log(infoCartao)


            if (infoCartao.numeroCartao.length !== 16 || !infoCartao.numeroCartao) 
                throw new Error('Número do cartão incorreto!');
            
            if (infoCartao.validade === '' || infoCartao.validade.length !== 5 || !infoCartao.validade)
                throw new Error('Validade incorreta!');
            
            if (infoCartao.cvv === '' || infoCartao.cvv.length !== 3 || !infoCartao.cvv)
                throw new Error('CVV incorreto!');

            if (infoCartao.titular === '' || !infoCartao.titular) 
                throw new Error('Insira o nome do titular!');

            if (/\d/.test(infoCartao.titular))
                throw new Error('Nome é inválido!')
            
                
            if (infoCartao.identidade === '' || infoCartao.identidade.length !== 11 || !infoCartao.identidade)  
                throw new Error('CPF incorreto!');

        
        const resposta = await cadastroCartao(infoCartao);
        resp.send(resposta);
    } catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})















// Buscando 

clienteEndpoints.post('/cliente/login', async (req, resp) => {
    try{
        const {email, senha} = req.body
        if(!email)
            throw new Error('Email obrigatório')
        if(!senha)
            throw new Error('Senha obrigatória')

        const resposta = await Login(email, senha)

        if(!resposta)
            throw new Error('Login ou senha inválidos')

        resp.send(resposta)
    }
    catch(err){
        resp.status(401).send({
            erro: err.message
        })
    }
})

clienteEndpoints.get('/endereco/:id', async (req , resp) => {
    try{
        const {id} = req.params

        const resposta = await buscarEnderecoPorIdEndereco(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


clienteEndpoints.get('/enderecos/:id', async (req, resp) => {
    try {
        const {id} = req.params

        const resposta = await buscarEnderecosPorIdCliente(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

clienteEndpoints.get('/cartoes/:id', async (req, resp) => {
    try {
        const {id} = req.params

        const resposta = await buscarCartoesPorIdCliente(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

clienteEndpoints.get('/cliente/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await buscarClienteId(id);
        resp.send(resposta);
        
    } catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
});













// Alterando 

clienteEndpoints.put('/endereco/:id', async (req, resp) => {
    try{
        const id = Number(req.params.id)

        const endereco = req.body

        if(!id || id === 0 || isNaN(id))
            throw new Error('Id endereço inválido ou indefinido')
        if(!endereco.cidade)
            throw new Error('CEP incorreto')
        if(!endereco.rua)
            throw new Error('CEP incorreto')
        if(!endereco.cep)
            throw new Error('CEP obrigatório')
        if(!endereco.numero)
            throw new Error('Número da casa obrigatório')

        const resposta = await alterarEndereco(id, endereco)

        if(resposta !== 1)
            throw new Error('O endereço não pode ser alterado')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

clienteEndpoints.put('/cliente/:id', async (req, resp) => {
    try {
        const id = Number(req.params.id)
        const dadosCliente = req.body

        if(!dadosCliente.nome)
            throw new Error('É obrigatório ter um nome')
        if(!dadosCliente.telefone)
            throw new Error('É obrigatório ter um número de telefone')
        if(!dadosCliente.email)
            throw new Error('É obrigatório ter um email')
        if(!dadosCliente.cpf)
            throw new Error('É obrigatório ter um CPF')

        const resposta = await alterarCliente(id, dadosCliente)
        if(resposta !== 1)
            throw new Error('Não foi possível alterar os dados pessoais')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})













// Deletando

clienteEndpoints.delete('/endereco', async (req, resp) => {
    try {
        const id = Number(req.query.id)    

        if(!id || id === 0 || isNaN(id))
            throw new Error('Id inválido ou indefinido')

        const resposta = await deletarEndereco(id)
        if(resposta !== 1)
            throw new Error('Não foi possível deletar o endereço')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


export default clienteEndpoints;