const { Tenis } = require('./model');
const jwt = require('jsonwebtoken');
const { Marca } = require('../marcas/model');


class TenisController {

    constructor() {
        
    }

    async create(req, res) {
        const { nome, descricao, colorway ,lancamento, marcaId } = req.body;

        let T = await Marca.findByPk(marcaId)

			if(!T){
				return res.status(400).json({msg: "Essa marca não existe"})
			}
        // PROCESSAMENTO
        const shoes = await Tenis.create({nome, descricao, colorway, lancamento, marcaId});

        // RESPOSTA
        return res.status(201).json(shoes);

    }

    async BuscapeloId(req, res){
        try {
            
            const shoes = await Tenis.findByPk(req.params.id)

            if (!shoes) {
                throw { status: 404, message: "ID esta errado"}
            }

            const {
                dataValues: {
                    nome,
                    descricao,
                    lancamento,
                    marcaId
                }
            } = shoes

            return res
                .status(200)
                .json({nome, descricao, lancamento, marcaId})
        } catch (error) {
            return res
                .status(error.status)
                .json({error});
        }
    }

    async update(req, res) {

        const { nome, descricao, colorway, lancamento, marcaId } = req.body;

        await Tenis.update({ nome, descricao, colorway, lancamento, marcaId }, {
        where: {
            id: req.params.id
        }
        })
        .then(function (updatedRecord) {
            console.log({ updatedRecord });
            if (updatedRecord[0] === 1) {
                res.status(200).json({ message: "Update realizado" });
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
        
        Tenis.destroy({
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
        const shoes = await Tenis.findAndCountAll();
        res.json(shoes);
    }


}


module.exports = TenisController;