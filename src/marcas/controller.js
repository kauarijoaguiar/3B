const { Marca } = require('./model');
const jwt = require('jsonwebtoken');

class MarcasController {

    constructor() {

    }

    async create(req, res) {

        // INPUT
        const { nome, descricao, cidade } = req.body;

        // PROCESSAMENTO
        const marka = await Marca.create({
            nome, descricao, cidade
        });

        // RESPOSTA
        return res.status(201).json(marka);

    }

    async update(req, res) {

        const { nome, descricao, cidade } = req.body;

        Marca.update(
            { nome, descricao, cidade },
            { _id: 'ID DA MARCA' }

        ).success(function () {

            res.status(200).json({ message: "DELETOU DE BOA" });

        }).error(function (err) {

            res.status(404).json({ message: "ID TA ERRADO MALUCO" })

        });
    }

    async delete(req, res) {

        Marca.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function (deletedRecord) {
            if (deletedRecord === 1) {
                res.status(200).json({ message: "DELETOU DE BOA" });
            }
            else {
                res.status(404).json({ message: "ID TA ERRADO MALUCO" })
            }
        })
        .catch(function (error) {
            res.status(500).json(error);
        });

    }

    async list(req, res) {
        const markas = await Marca.findAndCountAll();
        res.json(markas);
    }

}


module.exports = MarcasController;