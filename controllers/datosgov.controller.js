const model = require('../db/datosgov.model');
// const validator = require('../validators/');

/**
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getAllDatagovFromAll(req, res) {
  try {
    const data = await model.getAllFromAll();
    res.json(data);
  } catch (e) {
    res.status(500).send();
  }
}

/**
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLatestDatagovFromAll(req, res) {
  try {
    const data = await model.getLatestFromAll();
    res.json(data);
  } catch (e) {
    res.status(500).send();
  }
}

module.exports = {
  getAllDatagovFromAll,
  getLatestDatagovFromAll,
};
