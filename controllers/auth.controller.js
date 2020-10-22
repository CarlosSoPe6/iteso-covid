/**
 * Módulo del controlador de autentificación.
 * Este archivo contiene todos los endpoints del controlador de autentificacion.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */

const jwt = require('jsonwebtoken');

const singOptions = require('../config/jwtToken');
const { executionContext } = require('../db/executionContext');
const { getUserAuth } = require('../db/users.model');
const encrypt = require('../config/encrypt');

/**
 * POST /api/auth/login
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function login(req, res) {
  const { expediente, password } = req.body;
}