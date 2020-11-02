const model = require('../db/mapa.model');
const { executionContext } = require('../db/executionContext');
/**
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getMapaRadio(req, res) {
  executionContext((context) => {
    const { connection } = context;
    const { radio } = req.params;
    model.getByRadio(connection, radio)
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

module.exports = {
  getMapaRadio,
};
