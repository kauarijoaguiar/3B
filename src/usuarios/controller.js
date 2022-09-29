const { Usuario } = require('./model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class UsuariosController {

    constructor() {
        
    }

    async create(req, res) {
        // INPUT
        const { email, senha, nome } = req.body;

        // PROCESSAMENTO
        const user = await Usuario.create({
            email, senha, nome
        });

        // RESPOSTA
        return res.status(201).json(user);

    }

    async auth(req, res) {
        const { email, senha } = req.body;

        const user = await Usuario.findOne({
            where: {
                email, senha
            }
        });

        if (!user) {
            return res.status(400).json({ msg: "USER AND PASS NOT MATCH"});
        }
        console.log(user);
        const meuJwt = jwt.sign(user.dataValues, 'SECRET NAO PODERIA ESTAR HARDCODED')
        return res.json(meuJwt);
    }

    async list(req, res) {
        const users = await Usuario.findAndCountAll();
        res.json(users);
    }

    async profile(req, res) {
        res.json({ user: req.user});
    }


    async BuscapeloId(req, res) {
        try {
            let {id} = req.params
            id = parseFloat(id)
            const user = await Usuario.findByPk(id)

            if (!user) {
                throw {status: 404, message: "cu"}
            }

            const {
                dataValues: {
                    nome,
                    email
                }
            } = user

            return res
                .status(200)
                .json({id, nome, email})
        } catch (error) {
            return res
                .status(error.status)
                .json({error});
        }
    }

    

    async delete(req, res) {
        try {
            const {id} = req.user;
            await Usuario.destroy({where: {
                    id
                }});

            res.status(200).json({msg: 'Deletado'});
        } catch (error) {
            return res.json({error});
        }
    }


}


module.exports = UsuariosController;