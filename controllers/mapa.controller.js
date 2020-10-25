const model = require('../db/recomendaciones.model');

// const validator = require('../validators/');

/**
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getMapaRadio(req, res) {
  try {
    const data = await model.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).send();
  }
}

module.exports = {
  getMapaRadio,
};
