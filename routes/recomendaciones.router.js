const express = require('express');

const controller = require('../controllers/recomendaciones.controller');

const router = express.Router();

router.get('/', controller.getAllTips);
router.post('/', controller.postNewTip);
router.get('/id/:id', controller.getTipByID);
router.put('/id/:id', controller.putTipByID);
router.delete('/id/:id', controller.deleteTipByID);
router.get('/nivel/:nivel', controller.getTipByNivel);

module.exports = router;
