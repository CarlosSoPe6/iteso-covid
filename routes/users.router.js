const express = require('express');
const userController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.postUser);
router.get('/:folio', userController.getUserByFolio);

module.exports = router;
