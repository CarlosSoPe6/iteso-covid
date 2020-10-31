const model = require('../db/datosgov.model');
const { executionContext } = require('../db/executionContext');
const validator = require('../validators/datogov');

// const validator = require('../validators/');

/**
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getAllDatagovFromAll(req, res) {
  executionContext((context) => {
    const { connection } = context;
    model.getAllFromAll(connection)
      .then((data) => {
        res.statusCode = 200;
        res.send(data);
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
async function getLatestDatagovFromAll(req, res) {
  executionContext((context) => {
    const { connection } = context;
    model.getLatestFromAll(connection)
      .then((data) => {
        res.statusCode = 200;
        res.send(data);
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
async function postNewDatagov(req, res) {
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
      .then((datagov) => {
        res.send(datagov);
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
async function getLatestDatagovByEntity(req, res) {
  const { entidad } = req.params;
  executionContext((context) => {
    const { connection } = context;
    model.getLatestByEntity(connection, entidad)
      .then((data) => {
        if (data === undefined) {
          res.status(404);
          res.send();
          return;
        }
        res.statusCode = 200;
        res.send(data);
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
async function getAllDatagovByEntity(req, res) {
  const { entidad } = req.params;
  executionContext((context) => {
    const { connection } = context;
    model.getAllByEntity(connection, entidad)
      .then((data) => {
        if (data === undefined) {
          res.status(404);
          res.send();
          return;
        }
        res.statusCode = 200;
        res.send(data);
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
async function getDatagovFromAllBySpecificDate(req, res) {
  const { anio } = req.params;
  const { mes } = req.params;
  const { dia } = req.params;
  executionContext((context) => {
    const { connection } = context;
    model.getFromAllBySpecificDate(connection, anio, mes, dia)
      .then((data) => {
        if (data === undefined) {
          res.status(404);
          res.send();
          return;
        }
        res.statusCode = 200;
        res.send(data);
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
async function getDatagovByEntityBySpecificDate(req, res) {
  const { entidad } = req.params;
  const { anio } = req.params;
  const { mes } = req.params;
  const { dia } = req.params;
  executionContext((context) => {
    const { connection } = context;
    model.getByEntityBySpecificDate(connection, entidad, anio, mes, dia)
      .then((data) => {
        if (data === undefined) {
          res.status(404);
          res.send();
          return;
        }
        res.statusCode = 200;
        res.send(data);
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
  getAllDatagovFromAll,
  getLatestDatagovFromAll,
  postNewDatagov,
  getLatestDatagovByEntity,
  getAllDatagovByEntity,
  getDatagovFromAllBySpecificDate,
  getDatagovByEntityBySpecificDate,
};
