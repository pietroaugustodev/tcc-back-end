import { Router } from 'express'
import { Login } from '../repository/admRepository.js';


const admEndpoints = Router();

admEndpoints.post('/adm', async (req, resp) => {
    try{
        const { email, senha } = req.body
        if(!email)
            throw new Error('E-mail não identificado')
        if(!senha)
            throw new Error('Senha não identificada')

        const resposta = await Login(email, senha)
        if(!resposta)
            throw new Error('Sem autorização')
        resp.send(resposta)
    }
    catch(err){
        resp.status(401).send({
            erro: err.message
        })
    }
}) 

export default admEndpoints;