const model = require('../db/recomendaciones.model');

// const validator = require('../validators/');

/**
 * GET
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getAllTips(req, res) {
  try {
    const data = await model.getAll();
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
async function postNewTip(req, res) {
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
async function getTipByID(req, res) {
  const { id } = req.params;
  try {
    const data = await model.getByID(id);
    res.json(data);
  } catch (e) {
      console.log(e);
    res.status(500).send();
  }
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
  try {
    const data = await model.putByID(id, req.body);
    res.json(data);
  } catch (e) {
      console.log(e);
    res.status(500).send();
  }
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
  try {
    const data = await model.deleteByID(id);
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
async function getTipByNivel(req, res) {
  const { nivel } = req.params;
  try {
    const data = await model.getByNivel(nivel);
    res.json(data);
  } catch (e) {
      console.log(e);
    res.status(500).send();
  }
}

module.exports = {
  getAllTips,
  postNewTip,
  getTipByID,
  putTipByID,
  deleteTipByID,
  getTipByNivel,
};
