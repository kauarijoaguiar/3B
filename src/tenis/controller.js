const { Tenis } = require('./model');
const jwt = require('jsonwebtoken');

class TenisController {

    constructor() {
        
    }

    async create(req, res) {
        // INPUT
        const { nome, descricao } = req.body;

        // PROCESSAMENTO
        const user = await Tenis.create({
            nome, descricao
        });

        // RESPOSTA
        return res.status(201).json(user);

    }

}


module.exports = TenisController;