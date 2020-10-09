/* eslint linebreak-style: ["error", "windows"] */

const express = require('express');
const pruebasController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', pruebasController.getUsers);

module.exports = router;
