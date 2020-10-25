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

/**
 * POST
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function postNewDatagov(req, res) {
  try {
    const data = await model.postNew(req.body);
    res.json(data);
  } catch (e) {
    console.log(e);
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
async function getLatestDatagovByEntity(req, res) {
  const { entidad } = req.params;

  try {
    const data = await model.getLatestByEntity(entidad);
    res.json(data);
  } catch (e) {
    console.log(e);
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
async function getAllDatagovByEntity(req, res) {
  const { entidad } = req.params;
  try {
    const data = await model.getAllByEntity(entidad);
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
async function getDatagovFromAllBySpecificDate(req, res) {
  const { anio } = req.params;
  const { mes } = req.params;
  const { dia } = req.params;

  try {
    const data = await model.getFromAllBySpecificDate(anio, mes, dia);
    res.json(data);
  } catch (e) {
    console.log(e);
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
async function getDatagovByEntityBySpecificDate(req, res) {
  const { anio } = req.params;
  const { mes } = req.params;
  const { dia } = req.params;
  const { entidad } = req.params;

  try {
    const data = await model.getByEntityBySpecificDate(entidad, anio, mes, dia);
    res.json(data);
  } catch (e) {
    res.status(500).send();
  }
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
