import {Router } from "express";
import { criarCombo } from "../repository/compoRepository.js";

const comboEndpoints = Router();

comboEndpoints.get('/abcd', async (req, resp) => {
    const resposta = await criarCombo();
    resp.send(resposta);
})

export default comboEndpoints;