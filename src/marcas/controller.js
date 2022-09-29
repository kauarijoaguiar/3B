const { Marca } = require('./model');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../usuarios/model');

class MarcasController {

    constructor() {

    }

    async create(req, res) {

        // INPUT
        const { nome, descricao, cidade, datacriacao, usuarioId } = req.body;

        let M = await Usuario.findByPk(usuarioId)

			if(!M){
				return res.status(400).json({msg: "Esse usuario não existe"})
			}

        // PROCESSAMENTO
        const marka = await Marca.create({nome, descricao, cidade, datacriacao, usuarioId});

        // RESPOSTA
        return res.status(201).json(marka);

    }

    async update(req, res) {

        const { nome, descricao, cidade, datacriacao, usuarioId } = req.body;

        await Marca.update({ nome, descricao, cidade, datacriacao, usuarioId }, {
        where: {
            id: req.params.id
        }
        })
        .then(function (updatedRecord) {
            if (updatedRecord === 1) {
                res.status(200).json({ message: "Update realizado com sucesso" });
            }
            else {
                res.status(404).json({ message: "ID esta errado" })
            }
        })
        .catch(function (error) {
            res.status(500).json(error);
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
                res.status(200).json({ message: "Deletado" });
            }
            else {
                res.status(404).json({ message: "ID esta errado" })
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

    async BuscapeloId(req, res){      
        try {

            const markas = await Marca.findByPk(req.params.id)

            if (!markas) {
                throw { status: 404, message: "ID errado" }
            }

            const {
                dataValues: {
                    nome,
                    descricao,
                    datacriacao,
                    cidade
                }
            } = markas

            return res
                .status(200)
                .json({ nome, descricao, datacriacao, cidade })
        } catch (error) {
            return res
                .status(error.status)
                .json({ error });
        }
    }

}


module.exports = MarcasController;