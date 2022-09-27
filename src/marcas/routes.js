const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const MarcasController = require('./controller');
const router = Router();

const controller = new MarcasController();

router.post('/', (req, res) => controller.create(req, res));
router.post('/', (req, res) => controller.update(req, res));
router.get('/', (req, res) => controller.delete(req, res));
router.get('/', (req, res) => controller.list(req, res));

module.exports = router;