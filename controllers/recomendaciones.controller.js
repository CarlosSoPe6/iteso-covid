const model = require('../db/recomendaciones.model');
const { executionContext } = require('../db/executionContext');
const validator = require('../validators/recomendacion');
/**
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getAllTips(req, res) {
  executionContext((context) => {
    const { connection } = context;
    model.getAll(connection)
      .then((tips) => {
        res.statusCode = 200;
        res.send(tips);
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
 * POST
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function postNewTip(req, res) {
  const data = req.body;
  const validation = validator.validate(data);
  if (!validation.valid) {
    res.status(400);
    res.json(validation.data);
    return;
  }
  executionContext((context) => {
    const { connection } = context;
    model.postNew(connection, data)
      .then((tip) => {
        res.send(tip);
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
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getTipByID(req, res) {
  const { id } = req.params;
  executionContext((context) => {
    const { connection } = context;
    model.getByID(connection, id)
      .then((tip) => {
        if (tip === undefined) {
          res.status(404);
          res.send();
          return;
        }
        res.statusCode = 200;
        res.send(tip);
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
 * PUT
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function putTipByID(req, res) {
  const { id } = req.params;
  const data = req.body;
  const validation = validator.validate(data);
  if (!validation.valid) {
    res.status(400);
    res.json(validation.data);
    return;
  }
  executionContext((context) => {
    const { connection } = context;
    model.putByID(connection, id, data)
      .then((tip) => {
        res.send(tip);
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
 * DELETE
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function deleteTipByID(req, res) {
  const { id } = req.params;
  executionContext((context) => {
    const { connection } = context;
    model.deleteByID(connection, id)
      .then((tip) => {
        if (tip === undefined) {
          res.status(404);
          res.send();
          return;
        }
        res.statusCode = 200;
        res.send(tip);
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
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getTipByNivel(req, res) {
  const { nivel } = req.params;
  executionContext((context) => {
    const { connection } = context;
    model.getByNivel(connection, nivel)
      .then((tip) => {
        if (tip === undefined) {
          res.status(404);
          res.send();
          return;
        }
        res.statusCode = 200;
        res.send(tip);
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

module.exports = {
  getAllTips,
  postNewTip,
  getTipByID,
  putTipByID,
  deleteTipByID,
  getTipByNivel,
};
