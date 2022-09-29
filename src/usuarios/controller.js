const { Usuario } = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsuariosController {

    constructor() {
        
    }

    async create(req, res) {
        // INPUT
        const { email, nome } = req.body;
        const senha = bcrypt.hashSync(req.body.senha,10);
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
                email
            }
        });

        const confere= bcrypt.compareSync(senha, user.senha)

        if (!confere) {
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

    async BuscapeloId(req, res) {
        try {
        
            const user = await Usuario.findByPk(req.params.id)

            if (!user) {
                throw { status: 404, message: "ID esta errado"}
            }

            const {
                dataValues: {
                    nome,
                    email
                }
            } = user

            return res
                .status(200)
                .json({nome, email})
        } catch (error) {
            return res
                .status(error.status)
                .json({error});
        }
    }

    async update(req, res) {

        const { email, nome } = req.body;

        const senha = bcrypt.hashSync(req.body.senha,10);

        await Usuario.update({ email, senha, nome }, {
        where: {
            id: req.params.id
        }
        })
        .then(function (updatedRecord) {
            if (updatedRecord === 1) {
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

        Usuario.destroy({
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


}


module.exports = UsuariosController;