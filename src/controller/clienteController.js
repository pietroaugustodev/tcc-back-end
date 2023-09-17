import { Router } from "express";
import { cadastro, cadastroEndereco } from "../repository/clienteRepository.js";


const clienteEndpoints = Router()

clienteEndpoints.post('/cliente', async (req, resp) =>{
    try{
        const cliente = req.body
        if(!cliente.nome)
            throw new Error('O nome é obrigatório')
        if(!cliente.telefone)
            throw new Error('Telefone obrigatório')
        if(!cliente.cpf)
            throw new Error('CPF obrigatório')
        if(!cliente.nascimento)
            throw new Error('Nascimento obrigatório')
        if(!cliente.email)
            throw new Error('E-mail obrigatório')
        if(!cliente.senha)
            throw new Error('Senha obrigatória')

        const resposta = await cadastro(cliente)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

clienteEndpoints.post('/:num/endereco', async (req, resp) => {
    try{
        const endereco = req.body
        endereco.idCliente = Number(req.params.num)
        if(!endereco.idCliente || endereco.idCliente === 0)
            throw new Error('Id endereço inválido ou não encontrado')
        if(!endereco.cep)
            throw new Error('CEP obrigatório')
        if(!endereco.rua)
            throw new Error('Rua obrigatório')
        if(!endereco.cidade)
            throw new Error('Cidade obrigatório')
        if(!endereco.numero)
            throw new Error('Número obrigatório')

        const resposta = await cadastroEndereco(endereco)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

export default clienteEndpoints;