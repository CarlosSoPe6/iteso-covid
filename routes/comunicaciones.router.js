const express = require('express');

const controller = require('../controllers/comunicaciones.controller');

const router = express.Router();

router.get('/', controller.getAllComunicaciones);
router.post('/', controller.postComunicacion);
router.get('/id/:id', controller.getComunicacion);
router.put('/id/:id', controller.putComunicacion);
router.delete('/id/:id', controller.deleteComunicacion);

module.exports = router;
