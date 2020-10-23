const express = require('express');
const pruebasController = require('../controllers/pruebas.controller');
const { authn } = require('../middleware/authN');
const pruebasMiddleware = require('../middleware/pruebas.authz');

const router = express.Router();

router.get('/', pruebasController.getPruebas);
router.post('/', pruebasController.postPrueba);
router.get('/id/:id', pruebasController.getPruebaById);
router.put('/id/:id', authn, pruebasMiddleware.pruebas, pruebasController.putPruebaById);
router.delete('/id/:id', authn, pruebasMiddleware.pruebas, pruebasController.deletePruebaById);
router.get('/folio/:folio', authn, pruebasController.getPruebaByFolio);
router.delete('/folio/:folio', authn, pruebasController.deletePruebaByFolio);

module.exports = router;
