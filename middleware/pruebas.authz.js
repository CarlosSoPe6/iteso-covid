const { executionContext } = require('../db/executionContext');
const { verifyAccess } = require('../db/pruebas.model');

/**
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 * @param {import('express').NextFunction} next Next function.
 */
function pruebas(req, res, next) {
  const folio = req.user;
  if (folio === undefined) {
    res.sendStatus(401).end();
    return;
  }
  const resourceId = req.params.id;
  executionContext(async (context) => {
    const { connection } = context;
    const hasAccess = await verifyAccess(connection, resourceId, folio);
    console.log(hasAccess);
    if (!hasAccess) {
      res.sendStatus(403).end();
      return;
    }
    next();
  }).then(() => { }).catch((err) => res.status(500).send(err.message).end());
}

module.exports = {
  pruebas,
};
