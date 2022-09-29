const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const TenisController = require('./controller');
const router = Router();

const controller = new TenisController();

router.post('/', isAuth, (req, res) => controller.create(req, res));

router.get('/list', (req, res) => controller.list(req, res));
router.get('/:id', (req, res) => controller.BuscapeloId(req, res));

router.put('/update/:id', isAuth, (req, res) => controller.update(req, res));
router.delete('/delete/:id', isAuth, (req, res) => controller.delete(req, res));

module.exports = router;