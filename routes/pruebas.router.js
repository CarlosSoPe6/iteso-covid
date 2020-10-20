const express = require('express');
const pruebasController = require('../controllers/pruebas.controller');

const router = express.Router();

router.get('/', pruebasController.getPruebas);
router.post('/', pruebasController.postPrueba);
router.get('/id/:id', pruebasController.getPruebaById);
router.delete('/id/:id', pruebasController.deletePruebaById);
router.get('/folio/:folio', pruebasController.getPruebaByFolio);
router.delete('/folio/:folio', pruebasController.deletePruebaByFolio);

module.exports = router;
