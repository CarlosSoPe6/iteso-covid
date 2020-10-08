/* eslint linebreak-style: ["error", "windows"] */

const express = require('express');
const pruebasController = require('../controllers/pruebas.controller');

const router = express.Router();

router.get('/', pruebasController.getPruebas);
router.get('/id/:id', pruebasController.getPruebaById);

module.exports = router;
