const jwt = require('jsonwebtoken');

/**
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 * @param {import('express').NextFunction} next Next function.
 */
function authn(req, res, next) {
  const bearer = req.headers.authorization;

  if (bearer === undefined) {
    res.sendStatus(401).end();
    return;
  }

  const token = bearer.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEYPASS);
    const { folio } = decoded;
    req.user = folio;
    next();
  } catch (e) {
    res.status(400).send(e.message).end();
  }
}

module.exports = {
  authn,
};
