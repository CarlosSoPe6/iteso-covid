/**
 * @author Isaac Cabrera Cortés <isaaccabrera31@gmail.com>
 */
const pruebasModel = require('../db/pruebas.model');
const validator = require('../validators/prueba');
const validatorFolio = require('../validators/folio');

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
      if (prueba === undefined) {
        res.status(404);
        res.send();
        return;
      }
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

async function postPrueba(req, res) {
  const data = req.body;
  const validationFolio = validatorFolio.validateFolio(data.folio);
  if (!validationFolio) {
    res.status(404);
    res.send('Invalid user folio');
    return;
  }
  const validation = validator.validate(data);
  if (!validation.valid) {
    res.status(400);
    res.json(validation.data);
    return;
  }
  pruebasModel.postPrueba(data)
    .then((prueba) => {
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

async function deletePruebaById(req, res) {
  const { id } = req.params;
  pruebasModel.deletePruebaById(id)
    .then((affectedRows) => {
      if (affectedRows === 0) {
        res.status(404);
        res.send();
        return;
      }
      res.send();
    })
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

async function getPruebaByFolio(req, res) {
  const { folio } = req.params;
  const isValidFolio = validatorFolio.validateFolio(folio);
  if (!isValidFolio) {
    res.status(400);
    res.send({ err: 'Invalid user folio' });
    return;
  }
  pruebasModel.getPruebaByFolio(folio)
    .then((pruebas) => {
      res.json(pruebas);
    })
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

async function deletePruebaByFolio(req, res) {
  const { folio } = req.params;
  const isValidFolio = validatorFolio.validateFolio(folio);
  if (!isValidFolio) {
    res.status(400);
    res.send({ err: 'Invalid user folio' });
    return;
  }
  pruebasModel.deletePruebaByFolio(folio)
    .then((affectedRows) => {
      if (affectedRows === 0) {
        res.status(404);
        res.send();
        return;
      }
      res.send({ deleteCount: affectedRows });
    })
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

async function putPruebaById(req, res) {
  const { id } = req.params;
  const data = req.body;
  const isValidFolio = validatorFolio.validateFolio(data.folio);

  const validation = validator.validate(data);
  if (!validation.valid) {
    res.status(400);
    res.json(validation.data);
    return;
  }

  if (!isValidFolio) {
    res.status(400);
    res.send({ err: 'Invalid user folio' });
    return;
  }

  pruebasModel.putPruebaById(id, data)
    .then((prueba) => {
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
  postPrueba,
  deletePruebaById,
  getPruebaByFolio,
  deletePruebaByFolio,
  putPruebaById,
};
