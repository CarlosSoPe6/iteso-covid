/**
 * @author Isaac Cabrera Cortés <isaaccabrera31@gmail.com>
 */
const pruebasModel = require('../db/pruebas.model');
const validator = require('../validators/prueba');
const validatorFolio = require('../validators/folio');
const { executionContext } = require('../db/executionContext');

/**
 * GET /api/pruebas
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getPruebas(req, res) {
  executionContext((context) => {
    const { connection } = context;
    pruebasModel.getPruebas(connection)
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
  });
}

/**
 * GET /api/pruebas/id/{id}
 */
async function getPruebaById(req, res) {
  const idPrueba = req.params.id;
  executionContext((context) => {
    const { connection } = context;
    pruebasModel.getPruebaById(connection, idPrueba)
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
  executionContext((context) => {
    const { connection } = context;
    pruebasModel.postPrueba(connection, data)
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
  });
}

async function deletePruebaById(req, res) {
  const { id } = req.params;
  executionContext((context) => {
    const { connection } = context;
    pruebasModel.deletePruebaById(connection, id)
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
  executionContext((context) => {
    const { connection } = context;
    pruebasModel.getPruebaByFolio(connection, folio)
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
  executionContext((context) => {
    const { connection } = context;
    pruebasModel.deletePruebaByFolio(connection, folio)
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

  executionContext((context) => {
    const { connection } = context;
    pruebasModel.putPruebaById(connection, id, data)
      .then((esctrutinio) => {
        res.send({ esctrutinio });
      })
      .catch((err) => {
        if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
          res.status(400).send(err.sqlMessage);
        } else {
          res.status(500).send(err);
        }
      });
  });
}

/**
 * GET /covid/api/pruebas/casos?dtStart&dtEnd
 * @param {*} res Request
 * @param {*} res Response
 */
async function getCasosByDate(req, res) {
  const {
    dtStart,
    dtEnd,
  } = req.query;
  console.log(req.query);
  let start;
  let end;
  if (dtStart === undefined) {
    // Primer día del 2020
    start = new Date(2020, 0, 1);
  } else {
    start = new Date(dtStart);
  }
  if (dtEnd === undefined) {
    end = new Date(Date.now());
  } else {
    end = new Date(end);
  }
  try {
    executionContext(async (context) => {
      const { connection } = context;
      const json = await pruebasModel.getDateGroup(connection, start, end);
      if (json.length === 0) {
        res.sendStatus(404).end();
        return;
      }
      res.json(json).end();
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.err(err);
    res.status(500).send(err.message);
  }
}

module.exports = {
  getPruebas,
  getPruebaById,
  postPrueba,
  deletePruebaById,
  getPruebaByFolio,
  deletePruebaByFolio,
  putPruebaById,
  getCasosByDate,
};
