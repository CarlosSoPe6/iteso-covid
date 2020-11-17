const express = require('express');

const controller = require('../controllers/datosgov.controller');

const router = express.Router();

router.get('/', controller.getAllDatagovFromAll);
router.post('/', controller.postNewDatagov);
router.get('/todos', controller.getLatestDatagovFromAll);
router.get('/entidad/:entidad', controller.getLatestDatagovByEntity);
router.get('/entidad/:entidad/todos', controller.getAllDatagovByEntity);
router.get('/fecha/:anio/:mes/:dia', controller.getDatagovFromAllBySpecificDate);
router.get('/entidad/:entidad/fecha/:anio/:mes/:dia', controller.getDatagovByEntityBySpecificDate);

module.exports = router;
