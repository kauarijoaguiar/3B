const { Tenis } = require('./model');
const jwt = require('jsonwebtoken');
const { Marca } = require('../marcas/model');


class TenisController {

    constructor() {
        
    }

    async create(req, res) {
        const { nome, descricao, lancamento, marcaId } = req.body;

        let T = await Marca.findByPk(marcaId)

			if(!T){
				return res.status(400).json({msg: "Essa marca não existe"})
			}
        // PROCESSAMENTO
        const shoes = await Tenis.create({nome, descricao, lancamento, marcaId});

        // RESPOSTA
        return res.status(201).json(shoes);

    }

    async BuscapeloId(req, res){
        try {
            let {id} = req.params
            const shoes = await Tenis.findByPk(id)

            if (!shoes) {
                throw {status: 404, message: "cu"}
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
                .json({id, nome, descricao, lancamento, marcaId})
        } catch (error) {
            return res
                .status(error.status)
                .json({error});
        }
    }

    async update(req, res) {
        
    }

    async delete(req, res) {
        try {
            const {id} = req.user;
            await Tenis.destroy({where: {
                    id
                }});

            res.status(200).json({msg: 'Deletado'});
        } catch (error) {
            return res.json({error});
        }
    }

    async list(req, res) {
        const shoes = await Tenis.findAndCountAll();
        res.json(shoes);
    }


}


module.exports = TenisController;