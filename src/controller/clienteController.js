import { Router } from "express";
import { BuscarRepetido, Login, alterarEndereco, buscarTodosEnderecos, cadastro, cadastroEndereco, deletarEndereco } from "../repository/clienteRepository.js";


const clienteEndpoints = Router()


// Inserindo 

clienteEndpoints.post('/cliente', async (req, resp) =>{
    try{
        const cliente = req.body
        if(!cliente.nome)
            throw new Error('O nome é obrigatório')
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


clienteEndpoints.get('/enderecos/:id', async (req, resp) => {
    try {
        const {id} = req.params

        const resposta = await buscarTodosEnderecos(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

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