/**
 * @author Isaac Cabrera Cortés <isaaccabrera31@gmail.com>
 */
const pruebasModel = require('../db/pruebas.model');

/**
 * GET /api/pruebas
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getPruebas(req, res) {
  pruebasModel.getPruebas()
    .then((pruebas) => {
      res.statusCode = 200;
      res.send(pruebas);
    })
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

/**
 * GET /api/pruebas/id/{id}
 */
async function getPruebaById(req, res) {
  const idPrueba = req.params.id;
  pruebasModel.getPruebaById(idPrueba)
    .then((prueba) => {
      res.statusCode = 200;
      res.send(prueba);
    })
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

module.exports = {
  getPruebas,
  getPruebaById,
};
