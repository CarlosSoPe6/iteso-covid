const model = require('../db/communicaciones.model');
const validator = require('../validators/comunicaciones');

/**
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getAllComunicaciones(req, res) {
  try {
    const comunicaciones = await model.getAll();
    res.json(comunicaciones);
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
async function postComunicacion(req, res) {
  const validation = validator.validate(req.body);
  if (!validation.valid) {
    res.status(400).json(validation.data).end();
    return;
  }
  try {
    const { data } = validation;
    await model.post(data);
    res.status(201).json(data);
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
async function getComunicacion(req, res) {
  const { id } = req.params;
  try {
    const comunicaciones = await model.getById(id);
    res.json(comunicaciones);
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
async function putComunicacion(req, res) {
  const { id } = req.params;
  const validation = validator.validate(req.body);
  if (!validation.valid) {
    res.status(400).send(validation.data);
    return;
  }
  try {
    const exists = await validator.exists(id);
    if (!exists) {
      res.status(400).send(`${id} no existe`);
      return;
    }
    const { data } = validation;
    await model.put(id, data);
    res.status(201).json(data);
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
async function deleteComunicacion(req, res) {
  const { id } = req.params;
  try {
    const comunicaciones = await model.deleteById(id);
    res.json(comunicaciones);
  } catch (e) {
    res.status(500).send();
  }
}

module.exports = {
  getAllComunicaciones,
  postComunicacion,
  getComunicacion,
  putComunicacion,
  deleteComunicacion,
};
