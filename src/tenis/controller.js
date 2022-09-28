const { Tenis } = require('./model');
const jwt = require('jsonwebtoken');

class TenisController {

    constructor() {
        
    }

    async create(req, res) {

    }

    async update(req, res) {
        
    }

    async delete(req, res) {
        
    }

    async list(req, res) {
        const tenis = await Tenis.findAndCountAll();
        res.json(tenis);
    }


}


module.exports = TenisController;