const express = require('express');

const controller = require('../controllers/datosgov.controller');

const router = express.Router();

router.get('/', controller.getAllDatagovFromAll);
router.get('/todos', controller.getLatestDatagovFromAll);

module.exports = router;
