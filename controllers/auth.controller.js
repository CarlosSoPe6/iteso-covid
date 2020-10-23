/**
 * Módulo del controlador de autentificación.
 * Este archivo contiene todos los endpoints del controlador de autentificacion.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */

const jwt = require('jsonwebtoken');

const singOptions = require('../config/jwtToken');
const { executionContext } = require('../db/executionContext');
const { getUserByFolio } = require('../db/users.model');
const encrypt = require('../config/encrypt');

/**
 * POST /api/auth/login
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function login(req, res) {
  const { folio, contrasenia } = req.body;
  if (folio === undefined || contrasenia === undefined) {
    res.sendStatus(400);
    return;
  }
  let usuarioResult = null;
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      usuarioResult = await getUserByFolio(connection, folio);
    });
  } catch (e) {
    res.status(500).send(e.message);
    return;
  }

  if (usuarioResult === undefined) {
    res.sendStatus(404);
    return;
  }

  const userHash = usuarioResult.Contrasenia;
  const hashCompareResult = await encrypt.comparePassword(contrasenia, userHash);
  if (!hashCompareResult) {
    res.status(401).send('BAD PASSWORD');
    return;
  }

  jwt.sign(
    { folio },
    process.env.JWT_KEYPASS,
    singOptions,
    (err, encoded) => {
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.status(201).send({ encoded });
    },
  );
}

module.exports = {
  login,
};
