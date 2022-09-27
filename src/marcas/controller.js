const { Marca } = require('./model');
const jwt = require('jsonwebtoken');

class MarcasController {

    constructor() {
        
    }

    async create(req, res) {
        // INPUT
        const { nome, descricao } = req.body;

        // PROCESSAMENTO
        const user = await Marca.create({
            nome, descricao
        });

        // RESPOSTA
        return res.status(201).json(user);

    }

}


module.exports = MarcasController;