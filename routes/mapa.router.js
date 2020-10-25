const express = require('express');

const controller = require('../controllers/mapa.controller');

const router = express.Router();

router.get('/:radio', controller.getMapaRadio);

module.exports = router;
