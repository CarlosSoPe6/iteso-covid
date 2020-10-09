/* eslint linebreak-style: ["error", "windows"] */

/**
 * @author Isaac Cabrera Cortés <isaaccabrera31@gmail.com>
 */

const usersModel = require('../db/users.model');

/**
* @async
* @exports
* @param {import('express').Request} req Request parameter.
* @param {import('express').Response} res Response parameter.
*/
async function getUsers(req, res) {
  usersModel.getUsers()
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
}

module.exports = {
  getUsers,
};
