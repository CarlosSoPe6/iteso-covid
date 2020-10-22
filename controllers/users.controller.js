/**
 * @author Isaac Cabrera Cortés <isaaccabrera31@gmail.com>
 */

const usersModel = require('../db/users.model');
const validator = require('../validators/users');
const validatorFolio = require('../validators/folio');
const { executionContext } = require('../db/executionContext');

/**
* @async
* @exports
* @param {import('express').Request} req Request parameter.
* @param {import('express').Response} res Response parameter.
*/
async function getUsers(req, res) {
  executionContext((context) => {
    const { connection } = context;
    usersModel.getUsers(connection)
      .then((users) => {
        res.status(200);
        res.send(users);
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
* @async
* @exports
* @param {import('express').Request} req Request parameter.
* @param {import('express').Response} res Response parameter.
*/
async function getUserByFolio(req, res) {
  const { folio } = req.params;
  const isValidFolio = validatorFolio.validateFolio(folio);
  if (!isValidFolio) {
    res.status(400);
    res.send({ err: 'Invalid user folio' });
    return;
  }
  executionContext((context) => {
    const { connection } = context;
    usersModel.getUserByFolio(connection, folio)
      .then((user) => {
        if (user === undefined) {
          res.status(404);
          res.send();
        } else {
          res.status(200);
          res.json(user);
        }
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
* @async
* @exports
* @param {import('express').Request} req Request parameter.
* @param {import('express').Response} res Response parameter.
*/
async function postUser(req, res) {
  const validation = validator.validate(req.body);
  if (!validation.valid) {
    res.status(400);
    res.json(validation.data);
    return;
  }
  executionContext((context) => {
    const { connection } = context;
    usersModel.postUser(connection, req.body)
      .then((users) => {
        res.status(200);
        res.send(users);
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
  getUsers,
  postUser,
  getUserByFolio,
};
