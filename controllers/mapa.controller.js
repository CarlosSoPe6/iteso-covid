const model = require('../db/mapa.model');

// const validator = require('../validators/');

/**
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getMapaRadio(req, res) {
  const { radio } = req.params;
  try {
    const data = await model.getByRadio(radio);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

module.exports = {
  getMapaRadio,
};
